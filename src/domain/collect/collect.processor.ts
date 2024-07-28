import { QueueName } from '@common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { CollectService } from './collect.service';
import { CollectQueueName } from './constants';
import { CollectDTO } from './dtos';

@Processor(QueueName.Collect)
export class CollectProcessor {
  constructor(private readonly collectService: CollectService) {}

  @Process(CollectQueueName.CollectOrders)
  async collectOrders(job: Job<CollectDTO>) {
    const service = this.collectService.getService(job.data.target);
    await this.collectService.start(job.data);

    try {
      const orders = await service.collectOrders(job.data.target, job.data.credentials, job.data.condition);
      await this.collectService.callback(true, job.data, orders);
    } catch (e) {
      await this.collectService.callback(false, job.data, null, e);

      await job.moveToFailed(e, true);
      await job.finished();
    } finally {
      await this.collectService.end(job.data);
    }
  }
}
