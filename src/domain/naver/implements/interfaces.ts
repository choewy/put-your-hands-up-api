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
