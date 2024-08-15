import { EsmPlusService } from '@module';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { OrderCollectQueueName, OrderQueueName } from './constants';
import { CollectEsmPlusOrderDTO } from './dtos';
import { OrderService } from './order.service';

@Processor(OrderQueueName)
export class OrderProcessor {
  constructor(
    private readonly orderService: OrderService,
    private readonly esmPlusService: EsmPlusService,
  ) {}

  @Process(OrderCollectQueueName.CollectOrders)
  async collectOrders(job: Job<CollectEsmPlusOrderDTO>) {
    await this.orderService.start(job.data);

    try {
      const orders = await this.esmPlusService.collectOrders(job.data.target, job.data.credentials, job.data.condition);
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
