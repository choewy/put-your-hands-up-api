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
    const callbackDTO = new EsmPlusOrderCollectCallbackDTO({ payload: queueData.callback.payload });

    const queueName = EsmPlusQueueName.CollectOrder;
    const suffix = [queueData.credentials.type, queueData.credentials.account].join('_');
    await this.esmPlusQueueService.start(queueName, suffix);

    try {
      const orders = await this.esmPlusService.collectOrders(queueData);

      callbackDTO.result = true;
      callbackDTO.data = orders;
    } catch (e) {
      callbackDTO.result = false;
      callbackDTO.error = e;

      await job.moveToFailed(e, true);
      await job.finished();
    }

    await this.esmPlusQueueService.callback(queueData.callback.url, callbackDTO);
    await this.esmPlusQueueService.finish(queueName, suffix);
  }
}
