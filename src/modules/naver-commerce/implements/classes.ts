import { AxiosError, AxiosHeaders } from 'axios';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';

import {
  NaverCommerceCredentials,
  NaverCommerceDispatchProductOrderFailInfo,
  NaverCommerceDispatchProductOrdersErrorInfo,
  NaverCommerceDispatchProductOrdersResponse,
  NaverCommerceDispatchProductOrderTarget,
} from './interfaces';
import { NaverCommerceDeliveryCompanyCode, NaverCommerceDeliveryMethod } from '../constants';

export class NaverCommerceGetTokenHeader extends AxiosHeaders {
  constructor(credentials: NaverCommerceCredentials) {
    super({});

    const basicToken = Buffer.from([credentials.clientId, credentials.clientSecret].join(':')).toString('base64');

    this.set('Content-Type', 'application/x-www-form-urlencoded');
    this.set('Authorization', `Basic ${basicToken}`);
  }
}

export class NaverCommerceGetTokenRequestBody {
  readonly type = 'SELLER';
  readonly grant_type = 'client_credentials';
  readonly timestamp = Date.now();
  readonly account_id!: string;
  readonly client_id!: string;
  readonly client_secret_sign!: string;

  constructor(credentials: NaverCommerceCredentials) {
    const sign = [credentials.clientId, this.timestamp].join('_');
    const hashed = bcrypt.hashSync(sign, credentials.clientSecret);

    this.account_id = credentials.account;
    this.client_id = credentials.clientId;
    this.client_secret_sign = Buffer.from(hashed, 'binary').toString('base64');
  }
}

export class NaverCommerceDispatchProductOrderTargetMap extends Map<string, NaverCommerceDispatchProductOrderTarget[]> {
  constructor(targets: NaverCommerceDispatchProductOrderTarget[]) {
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

export class NaverCommerceDispatchProductOrderRequestHeader extends AxiosHeaders {
  constructor(accessToken: string) {
    super();

    this.set('Content-Type', 'application/json');
    this.set('Authorization', `Bearer ${accessToken}`);
  }
}

export class NaverCommerceDispatchProducrOrderRow {
  dispatchDate = DateTime.local().toISO({ includeOffset: true });

  productOrderId!: string;
  deliveryCompanyCode!: NaverCommerceDeliveryCompanyCode;
  deliveryMethod!: NaverCommerceDeliveryMethod;
  trackingNumber!: string;

  constructor(target: NaverCommerceDispatchProductOrderTarget) {
    this.productOrderId = target.productOrderId;
    this.deliveryCompanyCode = target.deliveryCompanyCode;
    this.deliveryMethod = target.isDirectly ? NaverCommerceDeliveryMethod.Direct : NaverCommerceDeliveryMethod.Normal;
    this.trackingNumber = target.trackingNumber;
  }
}

export class NaverCommerceDispatchProducrOrderRequestBody {
  dispatchProductOrders: NaverCommerceDispatchProducrOrderRow[];

  constructor(targets: NaverCommerceDispatchProductOrderTarget[]) {
    this.dispatchProductOrders = targets.map((target) => new NaverCommerceDispatchProducrOrderRow(target));
  }
}

export class NaverCommerceDispatchProductOrderSuccessRow {
  readonly orderId: string;
  readonly productOrderId: string;

  constructor(orderId: string, productOrderId: string) {
    this.orderId = orderId;
    this.productOrderId = productOrderId;
  }
}

export class NaverCommerceDispatchProductOrderFailRow {
  readonly orderId: string;
  readonly productOrderId: string;
  readonly message: string;
  readonly code: string;

  constructor(orderId: string, productOrderInfo: NaverCommerceDispatchProductOrderFailInfo) {
    this.orderId = orderId;
    this.productOrderId = productOrderInfo.productOrderId;
    this.message = productOrderInfo.message;
    this.code = productOrderInfo.code;
  }
}

export class NaverCommerceDispatchProductOrderResult {
  success: NaverCommerceDispatchProductOrderSuccessRow[] = [];
  failed: NaverCommerceDispatchProductOrderFailRow[] = [];

  public setResponse(orderId: string, responseData: NaverCommerceDispatchProductOrdersResponse) {
    for (const productOrderId of responseData.data.successProductOrderIds) {
      this.success.push(new NaverCommerceDispatchProductOrderSuccessRow(orderId, productOrderId));
    }

    for (const productOrderInfo of responseData.data.failProductOrderInfos) {
      this.failed.push(new NaverCommerceDispatchProductOrderFailRow(orderId, productOrderInfo));
    }
  }

  public setError(orderId: string, targets: NaverCommerceDispatchProductOrderTarget[], e: AxiosError) {
    const error = e?.response?.data as NaverCommerceDispatchProductOrdersErrorInfo;
    const code = error?.code ?? e.code;
    const message = error?.message ?? e.message;

    for (const target of targets) {
      this.failed.push(
        new NaverCommerceDispatchProductOrderFailRow(orderId, {
          productOrderId: target.productOrderId,
          code,
          message,
        }),
      );
    }
  }
}
