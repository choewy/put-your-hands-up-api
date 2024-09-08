import { AppConfigService, RequestContextService } from '@core';
import { AbstractRedisQueueService, InjectRedisClient } from '@infra';
import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisClientType } from 'redis';

import { NaverQueueName } from './constants';
import { NaverTransferInvoiceDTO } from './dtos';

@Injectable()
export class NaverQueueService extends AbstractRedisQueueService {
  constructor(
    @InjectQueue(NaverQueueName.Bull)
    queue: Queue,
    @InjectRedisClient()
    redis: RedisClientType,
    requestContextService: RequestContextService,
    appConfigService: AppConfigService,
    httpService: HttpService,
  ) {
    super(queue, redis, requestContextService, appConfigService, httpService);
  }

  public createCollectOrderQueueKey() {
    return '';
  }

  public createTransferInvoiceQueueKey(body: NaverTransferInvoiceDTO) {
    return `${NaverQueueName.TransferInvoice}:${body.credentials.mallId}_${body.credentials.account}`;
  }

  async registTransferInvoice(body: NaverTransferInvoiceDTO): Promise<void> {
    this.regist(NaverQueueName.TransferInvoice, this.createTransferInvoiceQueueKey(body), body);
  }
}
