import { ServiceException } from '@common';
import { AppConfigService, ErrorLog, RequestContextService } from '@core';
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bull';
import { DateTime } from 'luxon';
import { RedisClientType } from 'redis';
import { lastValueFrom } from 'rxjs';

import { RedisQueueErrorCode } from '../constants';
import { RedisQueueCallback } from '../helpers';

export abstract class AbstractRedisQueueService implements OnModuleDestroy {
  constructor(
    private readonly queue: Queue,
    private readonly redis: RedisClientType,
    private readonly requestContextService: RequestContextService,
    private readonly appConfigService: AppConfigService,
    private readonly httpService: HttpService,
  ) {}

  async onModuleDestroy() {
    if (this.appConfigService.isLocal) {
      await this.redis.flushDb();
    }
  }

  private async has(key: string) {
    return (await this.redis.get(key)) !== null;
  }

  protected async regist<QueuePayload>(queueName: string, key: string, payload: QueuePayload) {
    if (await this.has(key)) {
      throw new ServiceException(RedisQueueErrorCode.AlreadyRegistered, HttpStatus.CONFLICT);
    }

    const o = {
      requestId: this.requestContextService.getRequestID(),
      processId: null,
      startAt: null,
    };

    await this.redis.set(key, JSON.stringify(o, null, 2));
    await this.queue.add(queueName, payload, { jobId: o.requestId });

    return o.requestId;
  }

  async start(key: string) {
    const value = (await this.redis.get(key)) ?? null;

    if (value === null) {
      return;
    }

    const o = JSON.parse(value);

    o.processId = this.appConfigService.processId;
    o.startAt = DateTime.local().toISO();

    await this.redis.set(key, JSON.stringify(o, null, 2));
  }

  async finish(key: string) {
    await this.redis.del(key);
  }

  async callback<CallbackPayload, CallbackData>(url: string, result: RedisQueueCallback<CallbackPayload, CallbackData>) {
    await lastValueFrom(this.httpService.post(url, result)).catch((e) => {
      Logger.error(new ErrorLog(e?.response?.data ?? e?.errors[0], AbstractRedisQueueService.name, this.callback.name));
    });
  }
}
