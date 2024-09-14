import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { NaverApiUrlPath } from './constants';
import {
  NaverCredentials,
  NaverDispatchProducrOrderRequestBody,
  NaverDispatchProductOrderRequestHeader,
  NaverDispatchProductOrdersResponse,
  NaverDispatchProductOrderTarget,
  NaverDispatchProductOrderTargetMap,
  NaverGetTokenError,
  NaverGetTokenHeader,
  NaverGetTokenRequestBody,
  NaverGetTokenResponse,
  NaverDispatchProductOrderResult,
} from './implements';

@Injectable()
export class NaverService {
  constructor(
    private readonly baseUrl: string,
    private readonly httpService: HttpService,
  ) {}

  async transferInvoices(credentials: NaverCredentials, targets: NaverDispatchProductOrderTarget[]) {
    return this.dispatchProductOrders(await this.getAccessToken(credentials), targets);
  }

  private getApiUrl(urlPath: NaverApiUrlPath) {
    return [this.baseUrl, urlPath.startsWith('/') ? urlPath.slice(1) : urlPath].join('/');
  }

  private async getAccessToken(credentials: NaverCredentials) {
    const url = this.getApiUrl(NaverApiUrlPath.GetToken);
    const body = new NaverGetTokenRequestBody(credentials);
    const headers = new NaverGetTokenHeader(credentials);

    const { data } = await lastValueFrom(this.httpService.post<NaverGetTokenResponse>(url, body, { headers })).catch((e) => {
      throw new NaverGetTokenError(e);
    });

    return data.access_token;
  }

  private async dispatchProductOrders(accessToken: string, transferTagets: NaverDispatchProductOrderTarget[]) {
    const headers = new NaverDispatchProductOrderRequestHeader(accessToken);

    const dispatchProductOrderResult = new NaverDispatchProductOrderResult();
    const dispatchProductOrderTargetMap = new NaverDispatchProductOrderTargetMap(transferTagets);

    for (const orderId of dispatchProductOrderTargetMap.keys()) {
      const targets = dispatchProductOrderTargetMap.getAndDelete(orderId);
      const body = new NaverDispatchProducrOrderRequestBody(targets);

      try {
        const { data } = await lastValueFrom(
          this.httpService.post<NaverDispatchProductOrdersResponse>(this.getApiUrl(NaverApiUrlPath.TransferInvoices), body, { headers }),
        );

        dispatchProductOrderResult.setResponse(orderId, data);
      } catch (e) {
        dispatchProductOrderResult.setError(orderId, targets, e);
      }

      await this.waitFor(1);
    }

    return dispatchProductOrderResult;
  }

  private async waitFor(seconds = 1) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }
}
