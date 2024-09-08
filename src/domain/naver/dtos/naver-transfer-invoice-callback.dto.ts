import { RedisQueueResultDTOBuilder } from '@infra';

import { NaverTransferInvoiceResultDTO } from './naver-transfer-invoice-result.dto';

export class NaverTransferInvoiceCallbackDTO extends RedisQueueResultDTOBuilder(NaverTransferInvoiceResultDTO) {}
