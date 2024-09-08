import { ApiResponseProperty } from '@nestjs/swagger';

import { NaverDispatchProductOrderFailInfo } from '../implements';

export class NaverTransferInvoiceFailDTO {
  @ApiResponseProperty({ type: String })
  orderId: string;

  @ApiResponseProperty({ type: String })
  productOrderId: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: String })
  code: string;

  constructor(orderId: string, productOrderInfo: NaverDispatchProductOrderFailInfo) {
    this.orderId = orderId;
    this.productOrderId = productOrderInfo.productOrderId;
    this.message = productOrderInfo.message;
    this.code = productOrderInfo.code;
  }
}
