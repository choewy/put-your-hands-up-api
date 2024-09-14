import { DynamicModuleAsyncOptions, DynamicModuleOptions } from '@common';

import { NaverDeliveryCompanyCode } from '../constants';

export interface NaverModuleOptions extends DynamicModuleOptions {
  baseUrl: string;
}

export interface NaverModuleAsyncOptions extends DynamicModuleAsyncOptions<Omit<NaverModuleOptions, 'isGlobal'>> {}

export interface NaverCredentials {
  mallId: string;
  account: string;
  clientId: string;
  clientSecret: string;
}

export interface NaverGetTokenResponse {
  token_type: 'Bearer';
  access_token: string;
  expires_in: number;
}

export interface NaverDispatchProductOrderFailInfo {
  productOrderId: string;
  code: string;
  message: string;
}

export interface NaverDispatchProductOrdersErrorInfo {
  timestamp: string;
  traceId: string;
  code: string;
  message: string;
}

export interface NaverDispatchProductOrdersResponse {
  timestamp: string;
  traceId: string;
  data: {
    successProductOrderIds: Array<string>;
    failProductOrderInfos: Array<NaverDispatchProductOrderFailInfo>;
  };
}

export interface NaverDispatchProductOrderTarget {
  orderId: string;
  productOrderId: string;
  deliveryCompanyCode: NaverDeliveryCompanyCode;
  trackingNumber: string;
  isDirectly: boolean;
}

export interface NaverDispatchProductOrderParam {
  credentials: NaverCredentials;
  targets: NaverDispatchProductOrderTarget[];
}
