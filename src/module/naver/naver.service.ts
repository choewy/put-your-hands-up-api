import { NaverConfigService } from '@core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { NaverApiUrlPath } from './constants';
import { NaverGetTokenError, NaverGetTokenHeader, NaverGetTokenRequestBody, NaverGetTokenResponse } from './implements';

@Injectable()
export class NaverService {
  constructor(
    private readonly naverConfigService: NaverConfigService,
    private readonly httpService: HttpService,
  ) {}

  async onApplicationBootstrap() {}

  private getApiUrl(urlPath: NaverApiUrlPath) {
    return [this.naverConfigService.apiUrl, urlPath.startsWith('/') ? urlPath.slice(1) : urlPath].join('/');
  }

  /**
   * @summary Naver Access Token 발급
   */
  private async getAccessToken(accountId: string) {
    const url = this.getApiUrl(NaverApiUrlPath.GetToken);
    const body = new NaverGetTokenRequestBody(accountId, this.naverConfigService.credentials);
    const headers = new NaverGetTokenHeader(this.naverConfigService.credentials);

    const { data } = await lastValueFrom(this.httpService.post<NaverGetTokenResponse>(url, body, { headers })).catch((e) => {
      throw new NaverGetTokenError(e);
    });

    return data.access_token;
  }

  /**
   * @summary Naver 송장 전송
   */
  private async transferInvoices() {
    // TODO
  }
}
