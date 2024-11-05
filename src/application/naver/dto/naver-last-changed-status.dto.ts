import { ApiProperty } from '@nestjs/swagger';

import { NaverClaimStatus, NaverClaimType, NaverGiftReceivingStatus, NaverLastChangedType, NaverProductOrderStatus } from '../constant/enums';
import { NaverLastChangedStatus } from '../constant/interfaces';

export class NaverLastChangedStatusDTO implements Omit<NaverLastChangedStatus, 'lastChangedDate' | 'paymentDate'> {
  @ApiProperty({ type: String })
  orderId: string;

  @ApiProperty({ type: String })
  productOrderId: string;

  @ApiProperty({ type: String, enum: NaverProductOrderStatus })
  productOrderStatus: NaverProductOrderStatus;

  @ApiProperty({ type: String, enum: NaverLastChangedType })
  lastChangedType: NaverLastChangedType;

  @ApiProperty({ type: Date })
  lastChangedDate: Date;

  @ApiProperty({ type: Boolean })
  receiverAddressChanged: boolean;

  @ApiProperty({ type: Date })
  paymentDate: Date;

  @ApiProperty({ type: String, enum: NaverClaimType })
  claimType: NaverClaimType;

  @ApiProperty({ type: String, enum: NaverClaimStatus })
  claimStatus: NaverClaimStatus;

  @ApiProperty({ type: String, enum: NaverGiftReceivingStatus })
  giftReceivingStatus: NaverGiftReceivingStatus;

  constructor(lastChangedStatus: Partial<NaverLastChangedStatus>) {
    this.orderId = lastChangedStatus.orderId;
    this.productOrderId = lastChangedStatus.productOrderId;
    this.productOrderStatus = lastChangedStatus.productOrderStatus;
    this.lastChangedType = lastChangedStatus.lastChangedType;
    this.lastChangedDate = new Date(lastChangedStatus.lastChangedDate);
    this.receiverAddressChanged = lastChangedStatus.receiverAddressChanged;
    this.paymentDate = new Date(lastChangedStatus.paymentDate);
    this.claimType = lastChangedStatus.claimType;
    this.claimStatus = lastChangedStatus.claimStatus;
    this.giftReceivingStatus = lastChangedStatus.giftReceivingStatus;
  }
}
