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
import { NaverConfirmDTO, NaverGetOrdersDTO, NaverGetOrdersResponseDTO, NaverLastChangedStatusDTO, NaverOAuthDTO } from './dtos';

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

  async getOrders(body: NaverGetOrdersDTO) {
    const oauth = await this.createOAuth(body);

    let lastChangedStatues: NaverLastChangedStatusDTO[] = [];

    for (const lastChangedType of body.lastChangedTypes) {
      lastChangedStatues = lastChangedStatues.concat(await this.getLastChangedStatuses(oauth, body.startDate, body.endDate, lastChangedType));
    }

    const lastChangedStatusOrderProductIds = lastChangedStatues.map(({ productOrderId }) => productOrderId);

    const confirmResults = await this.confirmProductOrders(oauth, lastChangedStatusOrderProductIds);
    const confirmSuccessProductOrderIds = confirmResults.filter(({ status }) => status).map(({ productOrderId }) => productOrderId);

    const productOrders = await this.getProductOrders(oauth, confirmSuccessProductOrderIds);

    console.log(productOrders);

    // TODO productOrders
    return new NaverGetOrdersResponseDTO(lastChangedStatues, confirmResults);
  }

  async getOAuth(body: NaverOAuthCredentials) {
    return new NaverOAuthDTO(await this.createOAuth(body));
  }

  private async createOAuth<T extends NaverOAuthCredentials>(credentials: T) {
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

    oauth.set(await this.createOAuth(oauth.credentials));
  }

  private async getLastChangedStatuses(oauth: NaverOAuth, startDate: DateTime, endDate: DateTime, lastChangedType: NaverLastChangedType) {
    const lastChangedStatuses: NaverLastChangedStatusDTO[] = [];
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

        for (const lastChangedStatus of data.lastChangeStatuses) {
          lastChangedStatuses.push(new NaverLastChangedStatusDTO(lastChangedStatus));
        }

        if (more === null) {
          break;
        }

        params.lastChangedFrom = more.moreFrom;
        params.moreSequence = more.moreSequence;
      } catch (e) {
        const error = new NaverResponseError(e);

        console.log({ params, error });

        continue;
      }
    }

    return lastChangedStatuses;
  }

  private async confirmProductOrders(oauth: NaverOAuth, targetProductOrderIds: string[]) {
    if (this.isEnableConfirm() === false) {
      return targetProductOrderIds.map((productOrderId) => new NaverConfirmDTO({ productOrderId }, true));
    }

    const confirmResults: NaverConfirmDTO[] = [];

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

        for (const orderInfo of data.data.successProductOrderInfos) {
          confirmResults.push(new NaverConfirmDTO(orderInfo, true));
        }

        for (const orderInfo of data.data.failProductOrderInfos) {
          confirmResults.push(new NaverConfirmDTO(orderInfo, false));
        }
      } catch (e) {
        const error = new NaverResponseError(e);

        for (const productOrderId of productOrderIds) {
          confirmResults.push(new NaverConfirmDTO({ productOrderId, message: error.message }, false));
        }

        continue;
      }
    }

    return confirmResults;
  }

  private async getProductOrders(oauth: NaverOAuth, targetProductOrderIds: string[]) {
    // TODO dtos
    const productOrders = [];

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

    return productOrders;
  }
}
