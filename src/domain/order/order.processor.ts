import { QueueName } from '@common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { CollectQueueName } from './constants';
import { CollectDTO } from './dtos';
import { OrderService } from './order.service';

@Processor(QueueName.Collect)
export class OrderProcessor {
  constructor(private readonly orderService: OrderService) {}

  @Process(CollectQueueName.CollectOrders)
  async collectOrders(job: Job<CollectDTO>) {
    const service = this.orderService.getService(job.data.target);
    await this.orderService.start(job.data);

    try {
      const orders = await service.collectOrders(job.data.target, job.data.credentials, job.data.condition);
      await this.orderService.callback(true, job.data, orders);
    } catch (e) {
      await this.orderService.callback(false, job.data, null, e);

      await job.moveToFailed(e, true);
      await job.finished();
    } finally {
      await this.orderService.end(job.data);
    }
  }
}
