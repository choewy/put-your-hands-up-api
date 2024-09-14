import { DynamicModuleAsyncOptions, DynamicModuleOptions } from '@common';

import { NaverCommerceMode, NaverCommerceDeliveryCompanyCode } from '../constants';

export interface NaverCommerceModuleOptions extends DynamicModuleOptions {
  mode: NaverCommerceMode;
}

export interface NaverCommerceModuleAsyncOptions extends DynamicModuleAsyncOptions<Omit<NaverCommerceModuleOptions, 'isGlobal'>> {}

export interface NaverCommerceCredentials {
  mallId: string;
  account: string;
  clientId: string;
  clientSecret: string;
}

export interface NaverCommerceGetTokenResponse {
  token_type: 'Bearer';
  access_token: string;
  expires_in: number;
}

export interface NaverCommerceDispatchProductOrderFailInfo {
  productOrderId: string;
  code: string;
  message: string;
}

export interface NaverCommerceDispatchProductOrdersErrorInfo {
  timestamp: string;
  traceId: string;
  code: string;
  message: string;
}

export interface NaverCommerceDispatchProductOrdersResponse {
  timestamp: string;
  traceId: string;
  data: {
    successProductOrderIds: Array<string>;
    failProductOrderInfos: Array<NaverCommerceDispatchProductOrderFailInfo>;
  };
}

export interface NaverCommerceDispatchProductOrderTarget {
  orderId: string;
  productOrderId: string;
  deliveryCompanyCode: NaverCommerceDeliveryCompanyCode;
  trackingNumber: string;
  isDirectly: boolean;
}

export interface NaverCommerceDispatchProductOrderParam {
  credentials: NaverCommerceCredentials;
  targets: NaverCommerceDispatchProductOrderTarget[];
}
