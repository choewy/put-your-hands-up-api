import { NaverConfigService } from '@core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { NaverApiUrlPath } from './constants';
import { NaverCredentialsDTO, NaverTransferInvoiceDTO, NaverTransferInvoiceResultDTO, NaverTransferInvoiceTargetDTO } from './dtos';
import {
  NaverDispatchProductOrdersResponse,
  NaverGetTokenError,
  NaverGetTokenHeader,
  NaverGetTokenRequestBody,
  NaverGetTokenResponse,
  NaverTransferInvoiceRequestBody,
  NaverTransferInvoiceRequestHeader,
  NaverTransferInvoiceTargetMap,
} from './implements';

@Injectable()
export class NaverService {
  constructor(
    private readonly naverConfigService: NaverConfigService,
    private readonly httpService: HttpService,
  ) {}

  async transferInvoices({ credentials, targets }: NaverTransferInvoiceDTO) {
    const accessToken = await this.getAccessToken(credentials);
    const results = await this.dispatchProductOrders(accessToken, targets);

    return results;
  }

  private getApiUrl(urlPath: NaverApiUrlPath) {
    return [this.naverConfigService.apiUrl, urlPath.startsWith('/') ? urlPath.slice(1) : urlPath].join('/');
  }

  private async getAccessToken(credentials: NaverCredentialsDTO) {
    const url = this.getApiUrl(NaverApiUrlPath.GetToken);
    const body = new NaverGetTokenRequestBody(credentials);
    const headers = new NaverGetTokenHeader(credentials);

    const { data } = await lastValueFrom(this.httpService.post<NaverGetTokenResponse>(url, body, { headers })).catch((e) => {
      throw new NaverGetTokenError(e);
    });

    return data.access_token;
  }

  // TODO limit 파악 후 수정 필요(지금 그나마 주문단위로 묶어서 전송하도록 하였음)
  private async dispatchProductOrders(accessToken: string, transferTagets: NaverTransferInvoiceTargetDTO[]) {
    const result = new NaverTransferInvoiceResultDTO();
    const targetMap = new NaverTransferInvoiceTargetMap(transferTagets);

    for (const orderId of targetMap.keys()) {
      const targets = targetMap.getAndDelete(orderId);
      const headers = new NaverTransferInvoiceRequestHeader(accessToken);
      const body = new NaverTransferInvoiceRequestBody(targets);

      try {
        const { data } = await lastValueFrom(
          this.httpService.post<NaverDispatchProductOrdersResponse>(this.getApiUrl(NaverApiUrlPath.TransferInvoices), body, { headers }),
        );

        result.appendResults(orderId, data);
      } catch (e) {
        result.setError(e);
        break;
      }

      await this.waitFor(1);
    }

    return result;
  }

  private async waitFor(seconds = 1) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }
}
