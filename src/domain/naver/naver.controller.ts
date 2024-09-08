import { RegistCompleteDTO } from '@common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NaverTransferInvoiceCallbackDTO, NaverTransferInvoiceDTO } from './dtos';
import { NaverQueueService } from './naver-queue.service';

@ApiTags('Naver')
@Controller('naver')
export class NaverController {
  constructor(private readonly naverQueueService: NaverQueueService) {}

  @Post('invoices')
  @ApiOperation({ summary: 'Naver 송장 전송 Queue 등록' })
  @ApiOkResponse({ type: RegistCompleteDTO })
  @ApiCreatedResponse({
    type: NaverTransferInvoiceCallbackDTO,
    description: 'Callback URL로 결과 전송',
  })
  async registerTransferInvoices(@Body() body: NaverTransferInvoiceDTO) {
    return this.naverQueueService.registTransferInvoice(body);
  }
}
