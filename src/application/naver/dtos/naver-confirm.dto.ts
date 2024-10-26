import { ApiProperty } from '@nestjs/swagger';

import { NaverConfirmFailInfo, NaverConfirmSuccessInfo } from '../constants';

export class NaverConfirmDTO {
  @ApiProperty({ type: String })
  productOrderId: string;

  @ApiProperty({ type: Boolean })
  status: boolean;

  @ApiProperty({ type: Boolean })
  isReceiverAddressChanged?: boolean;

  @ApiProperty({ type: String })
  errorCode?: string;

  @ApiProperty({ type: String })
  errorMessage?: string;

  constructor(confirmResult: Partial<NaverConfirmSuccessInfo & NaverConfirmFailInfo>, status: boolean) {
    this.productOrderId = confirmResult.productOrderId;
    this.status = status;
    this.isReceiverAddressChanged = confirmResult.isReceiverAddressChanged;
    this.errorCode = confirmResult.code;
    this.errorMessage = confirmResult.message;
  }
}
