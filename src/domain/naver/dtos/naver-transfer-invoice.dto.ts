import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInstance, IsNotEmpty } from 'class-validator';

import { NaverCallbackDTO } from './naver-callback.dto';
import { NaverCredentialsDTO } from './naver-credentials.dto';
import { NaverTransferInvoiceTargetDTO } from './naver-transfer-invoice-target.dto';

export class NaverTransferInvoiceDTO {
  @ApiProperty({ type: NaverCredentialsDTO })
  @IsNotEmpty()
  @IsInstance(NaverCredentialsDTO)
  credentials: NaverCredentialsDTO;

  @ApiProperty({ type: [NaverTransferInvoiceTargetDTO] })
  @IsNotEmpty()
  @IsArray()
  @IsInstance(NaverTransferInvoiceTargetDTO, { each: true })
  targets: NaverTransferInvoiceTargetDTO[];

  @ApiProperty({ type: NaverCallbackDTO })
  @IsNotEmpty()
  @IsInstance(NaverCallbackDTO)
  callback: NaverCallbackDTO;
}
