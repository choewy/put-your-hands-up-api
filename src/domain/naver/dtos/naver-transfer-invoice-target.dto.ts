import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { NaverDeliveryCompanyCode } from '../constants';

export class NaverTransferInvoiceTargetDTO {
  @ApiProperty({ type: String, description: '주문번호' })
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty({ type: String, description: '상품주문번호' })
  @IsNotEmpty()
  @IsString()
  productOrderId: string;

  @ApiProperty({ type: String, enum: NaverDeliveryCompanyCode, description: '택배사 코드' })
  @IsNotEmpty()
  @IsEnum(NaverDeliveryCompanyCode)
  deliveryCompanyCode: NaverDeliveryCompanyCode;

  @ApiProperty({ type: String, description: '송장번호' })
  @IsNotEmpty()
  @IsString()
  trackingNumber: string;

  @ApiProperty({ type: Boolean, description: '직배송 여부' })
  @IsNotEmpty()
  @IsBoolean()
  isDirectly: boolean;
}
