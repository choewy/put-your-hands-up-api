import { ApiResponseProperty } from '@nestjs/swagger';

export class NaverTransferInvoiceSuccessDTO {
  @ApiResponseProperty({ type: String })
  orderId: string;

  @ApiResponseProperty({ type: String })
  productOrderId: string;

  constructor(orderId: string, productOrderId: string) {
    this.orderId = orderId;
    this.productOrderId = productOrderId;
  }
}
