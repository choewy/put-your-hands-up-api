import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { EsmPlusQueueName } from './constants';
import { EsmPlusOrderCollectCallbackDTO, EsmPlusOrderCollectDTO } from './dtos';
import { EsmPlusQueueService } from './esm-plus-queue.service';
import { EsmPlusService } from './esm-plus.service';

@Processor(EsmPlusQueueName.Bull)
export class EsmPlusProcessor {
  constructor(
    private readonly esmPlusService: EsmPlusService,
    private readonly esmPlusQueueService: EsmPlusQueueService,
  ) {}

  @Process(EsmPlusQueueName.CollectOrder)
  async collectOrders(job: Job<EsmPlusOrderCollectDTO>) {
    const queueData = job.data;
    const queueKey = this.esmPlusQueueService.createCollectOrderQueueKey(queueData);
    const queueResult = new EsmPlusOrderCollectCallbackDTO({ payload: queueData.callback.payload });

    await this.esmPlusQueueService.start(queueKey);

    try {
      const orders = await this.esmPlusService.collectOrders(queueData);

      queueResult.result = true;
      queueResult.data = orders;
    } catch (e) {
      queueResult.result = false;
      queueResult.error = e;

      await job.moveToFailed(e, true);
      await job.finished();
    } finally {
      await this.esmPlusQueueService.finish(queueKey);
      await this.esmPlusQueueService.callback(queueData.callback.url, queueResult);
    }
  }
}
