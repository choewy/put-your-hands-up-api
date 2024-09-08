import { ApiResponseProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

import { NaverDispatchProductOrdersErrorInfo } from '../implements';

export class NaverTransferInvoiceErrorDTO {
  @ApiResponseProperty({ type: String })
  traceId: string;

  @ApiResponseProperty({ type: String })
  timestamp: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: String })
  code: string;

  constructor(errorResponse: NaverDispatchProductOrdersErrorInfo) {
    this.traceId = errorResponse?.traceId ?? '';
    this.timestamp = errorResponse?.timestamp ?? DateTime.local().toISO({ includeOffset: true });
    this.message = errorResponse?.message ?? '';
    this.code = errorResponse?.code ?? '';
  }
}
