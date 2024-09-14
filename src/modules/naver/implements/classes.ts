import { AxiosError, AxiosHeaders } from 'axios';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';

import {
  NaverCredentials,
  NaverDispatchProductOrderFailInfo,
  NaverDispatchProductOrdersErrorInfo,
  NaverDispatchProductOrdersResponse,
  NaverDispatchProductOrderTarget,
} from './interfaces';
import { NaverDeliveryCompanyCode, NaverDeliveryMethod } from '../constants';

export class NaverGetTokenHeader extends AxiosHeaders {
  constructor(credentials: NaverCredentials) {
    super({});

    const basicToken = Buffer.from([credentials.clientId, credentials.clientSecret].join(':')).toString('base64');

    this.set('Content-Type', 'application/x-www-form-urlencoded');
    this.set('Authorization', `Basic ${basicToken}`);
  }
}

export class NaverGetTokenRequestBody {
  readonly type = 'SELLER';
  readonly grant_type = 'client_credentials';
  readonly timestamp = Date.now();
  readonly account_id!: string;
  readonly client_id!: string;
  readonly client_secret_sign!: string;

  constructor(credentials: NaverCredentials) {
    const sign = [credentials.clientId, this.timestamp].join('_');
    const hashed = bcrypt.hashSync(sign, credentials.clientSecret);

    this.account_id = credentials.account;
    this.client_id = credentials.clientId;
    this.client_secret_sign = Buffer.from(hashed, 'binary').toString('base64');
  }
}

export class NaverDispatchProductOrderTargetMap extends Map<string, NaverDispatchProductOrderTarget[]> {
  constructor(targets: NaverDispatchProductOrderTarget[]) {
    super();

    for (const target of targets) {
      const targetArrays = this.has(target.orderId) ? this.get(target.orderId) : [];

      this.set(target.orderId, targetArrays.concat(target));
    }
  }

  public getAndDelete(orderId: string) {
    const targets = this.get(orderId);

    this.delete(orderId);

    return targets;
  }
}

export class NaverDispatchProductOrderRequestHeader extends AxiosHeaders {
  constructor(accessToken: string) {
    super();

    this.set('Content-Type', 'application/json');
    this.set('Authorization', `Bearer ${accessToken}`);
  }
}

export class NaverDispatchProducrOrderRow {
  dispatchDate = DateTime.local().toISO({ includeOffset: true });

  productOrderId!: string;
  deliveryCompanyCode!: NaverDeliveryCompanyCode;
  deliveryMethod!: NaverDeliveryMethod;
  trackingNumber!: string;

  constructor(target: NaverDispatchProductOrderTarget) {
    this.productOrderId = target.productOrderId;
    this.deliveryCompanyCode = target.deliveryCompanyCode;
    this.deliveryMethod = target.isDirectly ? NaverDeliveryMethod.Direct : NaverDeliveryMethod.Normal;
    this.trackingNumber = target.trackingNumber;
  }
}

export class NaverDispatchProducrOrderRequestBody {
  dispatchProductOrders: NaverDispatchProducrOrderRow[];

  constructor(targets: NaverDispatchProductOrderTarget[]) {
    this.dispatchProductOrders = targets.map((target) => new NaverDispatchProducrOrderRow(target));
  }
}

export class NaverDispatchProductOrderSuccessRow {
  readonly orderId: string;
  readonly productOrderId: string;

  constructor(orderId: string, productOrderId: string) {
    this.orderId = orderId;
    this.productOrderId = productOrderId;
  }
}

export class NaverDispatchProductOrderFailRow {
  readonly orderId: string;
  readonly productOrderId: string;
  readonly message: string;
  readonly code: string;

  constructor(orderId: string, productOrderInfo: NaverDispatchProductOrderFailInfo) {
    this.orderId = orderId;
    this.productOrderId = productOrderInfo.productOrderId;
    this.message = productOrderInfo.message;
    this.code = productOrderInfo.code;
  }
}

export class NaverDispatchProductOrderResult {
  success: NaverDispatchProductOrderSuccessRow[] = [];
  failed: NaverDispatchProductOrderFailRow[] = [];

  public setResponse(orderId: string, responseData: NaverDispatchProductOrdersResponse) {
    for (const productOrderId of responseData.data.successProductOrderIds) {
      this.success.push(new NaverDispatchProductOrderSuccessRow(orderId, productOrderId));
    }

    for (const productOrderInfo of responseData.data.failProductOrderInfos) {
      this.failed.push(new NaverDispatchProductOrderFailRow(orderId, productOrderInfo));
    }
  }

  public setError(orderId: string, targets: NaverDispatchProductOrderTarget[], e: AxiosError) {
    const error = e?.response?.data as NaverDispatchProductOrdersErrorInfo;
    const code = error?.code ?? e.code;
    const message = error?.message ?? e.message;

    for (const target of targets) {
      this.failed.push(
        new NaverDispatchProductOrderFailRow(orderId, {
          productOrderId: target.productOrderId,
          code,
          message,
        }),
      );
    }
  }
}
