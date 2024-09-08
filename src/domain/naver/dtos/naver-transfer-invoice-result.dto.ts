import { ApiProperty } from '@nestjs/swagger';
import { AxiosError } from 'axios';

import { NaverTransferInvoiceErrorDTO } from './naver-transfer-invoice-error.dto';
import { NaverTransferInvoiceFailDTO } from './naver-transfer-invoice-fail.dto';
import { NaverTransferInvoiceSuccessDTO } from './naver-transfer-invoice-success.dto';
import { NaverDispatchProductOrdersErrorInfo, NaverDispatchProductOrdersResponse } from '../implements';

export class NaverTransferInvoiceResultDTO {
  @ApiProperty({ type: [NaverTransferInvoiceSuccessDTO], description: 'API 호출 성공/실패 유무 상관 없이 존재' })
  success: NaverTransferInvoiceSuccessDTO[] = [];

  @ApiProperty({ type: [NaverTransferInvoiceFailDTO], description: 'API 호출 성공/실패 유무 상관 없이 존재' })
  fail: NaverTransferInvoiceFailDTO[] = [];

  @ApiProperty({ type: NaverTransferInvoiceErrorDTO, description: '송장 전송 중 API 호출이 실패하는 경우 존재' })
  error: NaverTransferInvoiceErrorDTO | null = null;

  public appendResults(orderId: string, responseData: NaverDispatchProductOrdersResponse) {
    for (const productOrderId of responseData.data.successProductOrderIds) {
      this.success.push(new NaverTransferInvoiceSuccessDTO(orderId, productOrderId));
    }

    for (const productOrderInfo of responseData.data.failProductOrderInfos) {
      this.fail.push(new NaverTransferInvoiceFailDTO(orderId, productOrderInfo));
    }
  }

  public setError(e: AxiosError) {
    const error = e?.response?.data as NaverDispatchProductOrdersErrorInfo;

    this.error = new NaverTransferInvoiceErrorDTO({
      traceId: error?.traceId,
      timestamp: error?.timestamp,
      code: error?.code ?? e.code,
      message: error?.message ?? e.message,
    });
  }
}
