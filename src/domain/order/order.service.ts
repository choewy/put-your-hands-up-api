import { CredentialsDTO, ServiceException } from '@common';
import { AppConfigService, ErrorLog, RequestContextService } from '@core';
import { InjectRedisClient } from '@infra';
import { EsmPlusService } from '@module';
import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, HttpStatus, OnModuleDestroy, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { instanceToPlain } from 'class-transformer';
import { DateTime } from 'luxon';
import { RedisClientType } from 'redis';
import { lastValueFrom } from 'rxjs';

import { OrderCollectErrorCode, OrderCollectQueueName, OrderQueueName } from './constants';
import { CollectEsmPlusOrderDTO } from './dtos';

@Injectable()
export class OrderService implements OnModuleDestroy {
  constructor(
    @InjectQueue(OrderQueueName)
    private readonly queue: Queue,
    @InjectRedisClient()
    private readonly redis: RedisClientType,
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
    private readonly requestContextService: RequestContextService,
    private readonly esmPlusService: EsmPlusService,
  ) {}

  async onModuleDestroy() {
    if (this.appConfigService.isLocal) {
      await this.redis.flushDb();
    }
  }

  private createKey(credentials: CredentialsDTO) {
    return [OrderQueueName, [credentials.type, credentials.account].join('_')].join(':');
  }

  async has(key: string) {
    return (await this.redis.get(key)) !== null;
  }

  async registCollectOrders(body: CollectEsmPlusOrderDTO) {
    const key = this.createKey(body.credentials);

    if (await this.has(key)) {
      throw new ServiceException(OrderCollectErrorCode.Duplicated, HttpStatus.CONFLICT);
    }

    const o = instanceToPlain(body);

    o.requestId = this.requestContextService.getRequestID();
    o.processId = null;
    o.startAt = null;

    await this.redis.set(key, JSON.stringify(o, null, 2));
    await this.queue.add(OrderCollectQueueName.CollectOrders, body);
  }

  async start(body: CollectEsmPlusOrderDTO) {
    const key = this.createKey(body.credentials);
    const value = await this.redis.get(key);

    if (value === null) {
      return;
    }

    const o = JSON.parse(value);

    o.processId = this.appConfigService.processId;
    o.startAt = DateTime.local().toISO();

    await this.redis.set(key, JSON.stringify(o, null, 2));
  }

  async end(body: CollectEsmPlusOrderDTO) {
    const key = this.createKey(body.credentials);

    await this.redis.del(key);
  }

  async callback(result: boolean, body: CollectEsmPlusOrderDTO, orders: unknown, error?: unknown) {
    await lastValueFrom(
      this.httpService.post(body.callback.url, {
        result,
        payload: body.callback.payload,
        orders,
        error,
      }),
    ).catch((e) => {
      Logger.error(new ErrorLog(e?.response?.data ?? e?.errors[0], OrderService.name, this.callback.name));
    });
  }
}
