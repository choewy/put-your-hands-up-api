import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { lastValueFrom } from 'rxjs';

import { NaverOAuth, NaverOAuthCredentials } from './classes';
import {
  NaverBaseURL,
  NaverLastChangedStatusRequestParam,
  NaverLastChangedStatusResponse,
  NaverLastChangedType,
  NaverOAuthTokenRequestBody,
  NaverOAuthTokenResponse,
  NaverURLPath,
  NaverOAuthTokenError,
  NaverConfirmProductOrdersResponse,
  NaverProductOrdersResponse,
  NaverResponseError,
} from './constants';
import { NaverGetNaversOrdersDTO, NaverOAuthDTO } from './dtos';

import { isProduction } from '@/common';

@Injectable()
export class NaverService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    this.httpService.axiosRef.defaults.baseURL = isProduction() ? NaverBaseURL.Production : NaverBaseURL.Sandbox;
  }

  private isEnableConfirm() {
    switch (this.httpService.axiosRef.defaults.baseURL) {
      case NaverBaseURL.Production:
        return isProduction();

      default:
        return true;
    }
  }

  async getNaverOrders(body: NaverGetNaversOrdersDTO) {
    const oauth = await this.issueOAuth(body);

    let lastChangedProductOrderIds: string[] = [];

    for (const lastChangedType of body.lastChangedTypes) {
      lastChangedProductOrderIds = lastChangedProductOrderIds.concat(await this.getLastChangedStatuses(oauth, body.startDate, body.endDate, lastChangedType));
    }

    const confirmedProductOrderIds = await this.confirmProductOrders(oauth, lastChangedProductOrderIds);

    // TODO
    console.log(confirmedProductOrderIds);

    return;
  }

  async getOAuth(body: NaverOAuthCredentials) {
    return new NaverOAuthDTO(await this.issueOAuth(body));
  }

  private async issueOAuth<T extends NaverOAuthCredentials>(credentials: T) {
    const timestamp = Date.now();
    const saltKey = `$2a$04$${credentials.clientSecret}$`;
    const signature = `${credentials.clientId}_${timestamp}`;
    const hashedSignature = bcrypt.hashSync(signature, saltKey);
    const secretSign = Buffer.from(hashedSignature, 'binary').toString('base64');

    const body: NaverOAuthTokenRequestBody = {
      type: 'SELLER',
      grant_type: 'client_credentials',
      account_id: credentials.accountId,
      client_id: credentials.clientId,
      client_secret_sign: secretSign,
      timestamp,
    };

    try {
      const { data } = await lastValueFrom(
        this.httpService.post<NaverOAuthTokenResponse>(NaverURLPath.OAuthToken, body, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      return new NaverOAuth(credentials, data);
    } catch (e) {
      throw new NaverOAuthTokenError(e);
    }
  }

  private async refreshOAuth(oauth: NaverOAuth) {
    if (oauth.isExpired() === false) {
      return;
    }

    oauth.set(await this.issueOAuth(oauth.credentials));
  }

  private async getLastChangedStatuses(oauth: NaverOAuth, startDate: DateTime, endDate: DateTime, lastChangedType: NaverLastChangedType) {
    const lastChangedProductOrderIds: string[] = [];
    const params: NaverLastChangedStatusRequestParam = {
      lastChangedType,
      lastChangedFrom: startDate.startOf('day').toISO({ includeOffset: true }),
      lastChangedTo: endDate.endOf('day').toISO({ includeOffset: true }),
    };

    while (true) {
      try {
        await this.refreshOAuth(oauth);
        const res = await lastValueFrom(
          this.httpService.get<NaverLastChangedStatusResponse>(NaverURLPath.ProductOrdersLastChangedStatuses, {
            params,
            headers: {
              'Content-Type': 'application/json',
              Authorization: oauth.authorization,
            },
          }),
        );

        const data = res.data.data;
        const more = data.more ?? null;

        lastChangedProductOrderIds.push(...data.lastChangeStatuses.map(({ productOrderId }) => productOrderId));

        if (more === null) {
          break;
        }

        params.lastChangedFrom = more.moreFrom;
        params.moreSequence = more.moreSequence;
      } catch (e) {
        // TODO
        const error = new NaverResponseError(e);

        console.log({ params, error });

        continue;
      }
    }

    return lastChangedProductOrderIds;
  }

  private async confirmProductOrders(oauth: NaverOAuth, targetProductOrderIds: string[]) {
    if (this.isEnableConfirm() === false) {
      return targetProductOrderIds;
    }

    const confirmedProductOrderIds = [];

    let sliceIndex = 0;

    while (true) {
      sliceIndex += 30;

      const productOrderIds = targetProductOrderIds.slice(sliceIndex - 30, sliceIndex);

      if (productOrderIds.length === 0) {
        break;
      }

      try {
        await this.refreshOAuth(oauth);

        const headers = { 'Content-Type': 'application/json', Authorization: oauth.authorization };
        const body = { productOrderIds };

        const { data } = await lastValueFrom(this.httpService.post<NaverConfirmProductOrdersResponse>(NaverURLPath.ProductOrdersConfirm, body, { headers }));

        for (const successProductOrderInfo of data.data.successProductOrderInfos) {
          confirmedProductOrderIds.push(successProductOrderInfo.productOrderId);
        }
      } catch (e) {
        // TODO
        const error = new NaverResponseError(e);

        console.log({ productOrderIds, error });

        continue;
      }
    }

    return confirmedProductOrderIds;
  }

  private async getProductOrdersQuery(oauth: NaverOAuth, targetProductOrderIds: string[]) {
    let sliceIndex = 0;

    while (true) {
      sliceIndex += 300;

      const productOrderIds = targetProductOrderIds.slice(sliceIndex - 300, sliceIndex);

      if (productOrderIds.length === 0) {
        break;
      }

      try {
        await this.refreshOAuth(oauth);

        const headers = { 'Content-Type': 'application/json', Authorization: oauth.authorization };
        const body = { productOrderIds };

        const { data } = await lastValueFrom(this.httpService.post<NaverProductOrdersResponse>(NaverURLPath.ProductOrdersConfirm, body, { headers }));

        for (const o of data.data) {
          o.order;
          o.productOrder;
        }
      } catch (e) {
        // TODO
        const error = new NaverResponseError(e);

        console.log({ productOrderIds, error });

        continue;
      }
    }
  }
}
