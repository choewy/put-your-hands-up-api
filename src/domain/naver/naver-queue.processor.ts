import { RedisQueueError } from '@infra';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { NaverQueueName } from './constants';
import { NaverTransferInvoiceCallbackDTO, NaverTransferInvoiceDTO } from './dtos';
import { NaverQueueService } from './naver-queue.service';
import { NaverService } from './naver.service';

@Processor(NaverQueueName.Bull)
export class NaverQueueProcessor {
  constructor(
    private readonly naverService: NaverService,
    private readonly naverQueueService: NaverQueueService,
  ) {}

  @Process(NaverQueueName.TransferInvoice)
  async onTransferInvoices(job: Job<NaverTransferInvoiceDTO>) {
    const queueData = job.data;
    const queueKey = this.naverQueueService.createTransferInvoiceQueueKey(queueData);
    const queueResult = new NaverTransferInvoiceCallbackDTO({ payload: queueData.callback.payload });

    await this.naverQueueService.start(queueKey);

    try {
      queueResult.data = await this.naverService.transferInvoices(queueData);
      queueResult.result = true;
    } catch (e) {
      const queueError = new RedisQueueError(e);

      queueResult.error = queueError.toResponse();
      queueResult.result = false;

      await job.moveToFailed(queueError.toFailedError(), true);
      await job.finished();
    } finally {
      await this.naverQueueService.finish(queueKey);
      await this.naverQueueService.callback(queueData.callback.url, queueResult);
    }
  }
}
