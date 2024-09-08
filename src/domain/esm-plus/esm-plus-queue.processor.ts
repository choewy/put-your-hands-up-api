import { RedisQueueError } from '@infra';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { EsmPlusQueueName } from './constants';
import { EsmPlusOrderCollectCallbackDTO, EsmPlusOrderCollectDTO } from './dtos';
import { EsmPlusQueueService } from './esm-plus-queue.service';
import { EsmPlusService } from './esm-plus.service';

@Processor(EsmPlusQueueName.Bull)
export class EsmPlusQueueProcessor {
  constructor(
    private readonly esmPlusService: EsmPlusService,
    private readonly esmPlusQueueService: EsmPlusQueueService,
  ) {}

  @Process(EsmPlusQueueName.CollectOrder)
  async onCollectOrders(job: Job<EsmPlusOrderCollectDTO>) {
    const queueData = job.data;
    const queueKey = this.esmPlusQueueService.createCollectOrderQueueKey(queueData);
    const queueResult = new EsmPlusOrderCollectCallbackDTO({ payload: queueData.callback.payload });

    await this.esmPlusQueueService.start(queueKey);

    try {
      queueResult.data = await this.esmPlusService.collectOrders(queueData);
      queueResult.result = true;
    } catch (e) {
      const queueError = new RedisQueueError(e);

      queueResult.error = queueError.toResponse();
      queueResult.result = false;

      await job.moveToFailed(queueError.toFailedError(), true);
      await job.finished();
    } finally {
      await this.esmPlusQueueService.finish(queueKey);
      await this.esmPlusQueueService.callback(queueData.callback.url, queueResult);
    }
  }
}
