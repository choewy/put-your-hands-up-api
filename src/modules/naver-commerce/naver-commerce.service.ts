import { waitFor } from '@common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { NaverCommerceApiBaseUrl, NaverCommerceApiPath, NaverCommerceMode } from './constants';
import {
  NaverCommerceCredentials,
  NaverCommerceDispatchProducrOrderRequestBody,
  NaverCommerceDispatchProductOrderRequestHeader,
  NaverCommerceDispatchProductOrderResult,
  NaverCommerceDispatchProductOrdersResponse,
  NaverCommerceDispatchProductOrderTarget,
  NaverCommerceDispatchProductOrderTargetMap,
  NaverCommerceGetTokenError,
  NaverCommerceGetTokenHeader,
  NaverCommerceGetTokenRequestBody,
  NaverCommerceGetTokenResponse,
} from './implements';

@Injectable()
export class NaverCommerceService {
  constructor(
    private readonly mode: NaverCommerceMode,
    private readonly httpService: HttpService,
  ) {}

  async transferInvoices(credentials: NaverCommerceCredentials, targets: NaverCommerceDispatchProductOrderTarget[]) {
    return this.dispatchProductOrders(await this.getAccessToken(credentials), targets);
  }

  private get baseUrl() {
    return this.mode === NaverCommerceMode.Production ? NaverCommerceApiBaseUrl.Production : NaverCommerceApiBaseUrl.Sandbox;
  }

  private getApiUrl(path: NaverCommerceApiPath) {
    return [this.baseUrl, path.startsWith('/') ? path.slice(1) : path].join('/');
  }

  private async getAccessToken(credentials: NaverCommerceCredentials) {
    const body = new NaverCommerceGetTokenRequestBody(credentials);
    const headers = new NaverCommerceGetTokenHeader(credentials);

    const { data } = await lastValueFrom(
      this.httpService.post<NaverCommerceGetTokenResponse>(this.getApiUrl(NaverCommerceApiPath.GetAccessToken), body, { headers }),
    ).catch((e) => {
      throw new NaverCommerceGetTokenError(e);
    });

    return data.access_token;
  }

  private async dispatchProductOrders(accessToken: string, transferTagets: NaverCommerceDispatchProductOrderTarget[]) {
    const headers = new NaverCommerceDispatchProductOrderRequestHeader(accessToken);

    const dispatchProductOrderResult = new NaverCommerceDispatchProductOrderResult();
    const dispatchProductOrderTargetMap = new NaverCommerceDispatchProductOrderTargetMap(transferTagets);

    for (const orderId of dispatchProductOrderTargetMap.keys()) {
      const targets = dispatchProductOrderTargetMap.getAndDelete(orderId);
      const body = new NaverCommerceDispatchProducrOrderRequestBody(targets);

      try {
        const { data } = await lastValueFrom(
          this.httpService.post<NaverCommerceDispatchProductOrdersResponse>(
            this.getApiUrl(NaverCommerceApiPath.DispatchProductOrders),
            body,
            { headers },
          ),
        );

        dispatchProductOrderResult.setResponse(orderId, data);
      } catch (e) {
        dispatchProductOrderResult.setError(orderId, targets, e);
      }

      await waitFor(1);
    }

    return dispatchProductOrderResult;
  }
}
