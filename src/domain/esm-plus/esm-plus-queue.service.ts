import { RegistCompleteDTO } from '@common';
import { AppConfigService, RequestContextService } from '@core';
import { AbstractRedisQueueService, InjectRedisClient } from '@infra';
import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisClientType } from 'redis';

import { EsmPlusQueueName } from './constants';
import { EsmPlusOrderCollectDTO } from './dtos';

@Injectable()
export class EsmPlusQueueService extends AbstractRedisQueueService {
  constructor(
    @InjectQueue(EsmPlusQueueName.Bull)
    queue: Queue,
    @InjectRedisClient()
    redis: RedisClientType,
    requestContextService: RequestContextService,
    appConfigService: AppConfigService,
    httpService: HttpService,
  ) {
    super(queue, redis, requestContextService, appConfigService, httpService);
  }

  public createCollectOrderQueueKey(body: EsmPlusOrderCollectDTO) {
    return `${EsmPlusQueueName.CollectOrder}:${body.target}:${body.credentials.account}_${body.credentials.type}`;
  }

  public createTransferInvoiceQueueKey() {
    return '';
  }

  async registOrderCollect(body: EsmPlusOrderCollectDTO): Promise<RegistCompleteDTO> {
    return new RegistCompleteDTO(await this.regist(EsmPlusQueueName.CollectOrder, this.createCollectOrderQueueKey(body), body));
  }
}
