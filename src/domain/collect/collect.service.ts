import { CredentialsDTO, QueueName, ServiceException, TargetName } from '@common';
import { AppConfigService } from '@core';
import { InjectRedisClient } from '@infra';
import { EsmPlusService } from '@module';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, HttpStatus, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bull';
import { instanceToPlain } from 'class-transformer';
import { DateTime } from 'luxon';
import { RedisClientType } from 'redis';

import { CollectErrorCode, CollectQueueName } from './constants';
import { CollectDTO } from './dtos';

@Injectable()
export class CollectService implements OnModuleDestroy {
  constructor(
    @InjectQueue(QueueName.Collect)
    private readonly queue: Queue,
    @InjectRedisClient()
    private readonly redis: RedisClientType,
    private readonly appConfigService: AppConfigService,
    private readonly esmPlusService: EsmPlusService,
  ) {}

  async onModuleDestroy() {
    if (this.appConfigService.isLocal) {
      await this.redis.flushDb();
    }
  }

  public getService(target: TargetName) {
    switch (target) {
      case TargetName.Gmarket:
      case TargetName.Auction:
        return this.esmPlusService;
    }
  }

  private createKey(target: TargetName, credentials: CredentialsDTO) {
    return [QueueName.Collect, target, [credentials.type, credentials.account].join('_')].join(':');
  }

  async has(key: string) {
    return (await this.redis.get(key)) !== null;
  }

  async registCollectOrders(body: CollectDTO) {
    const key = this.createKey(body.target, body.credentials);

    if (await this.has(key)) {
      throw new ServiceException(CollectErrorCode.Duplicated, HttpStatus.CONFLICT);
    }

    const o = instanceToPlain(body);

    o.processId = null;
    o.startAt = null;
    o.endAt = null;

    await this.redis.set(key, JSON.stringify(o, null, 2));
    await this.queue.add(CollectQueueName.CollectOrders, body);
  }

  async start(body: CollectDTO) {
    const key = this.createKey(body.target, body.credentials);
    const value = await this.redis.get(key);

    if (value === null) {
      return;
    }

    const o = JSON.parse(value);

    o.processId = this.appConfigService.processId;
    o.startAt = DateTime.local().toISO();

    await this.redis.set(key, JSON.stringify(o, null, 2));
  }

  async end(body: CollectDTO) {
    const key = this.createKey(body.target, body.credentials);

    console.log(key);

    await this.redis.del(key);
  }
}
