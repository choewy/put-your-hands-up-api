import { AppConfigService, RequestContextService } from '@core';
import { AbstractRedisQueueService, InjectRedisClient } from '@infra';
import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisClientType } from 'redis';

import { EsmPlusQueueName, EsmPlusTarget } from './constants';
import { EsmPlusCredentialsDTO, EsmPlusOrderCollectDTO } from './dtos';

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

  private createSuffix(target: EsmPlusTarget, credentials: EsmPlusCredentialsDTO) {
    return `${target}:${credentials.account}_${credentials.type}`;
  }

  async registOrderCollect(body: EsmPlusOrderCollectDTO): Promise<void> {
    this.regist(EsmPlusQueueName.CollectOrder, this.createSuffix(body.target, body.credentials), body);
  }
}
