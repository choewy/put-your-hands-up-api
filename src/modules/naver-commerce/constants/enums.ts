export enum NaverCommerceMode {
  Sandbox = 'sandbox',
  Production = 'production',
}

export enum NaverCommerceApiBaseUrl {
  Sandbox = 'https://sandbox-api.commerce.naver.com',
  Production = 'https://api.commerce.naver.com',
}

export enum NaverCommerceApiPath {
  GetAccessToken = '/partner/v1/oauth2/token',
  DispatchProductOrders = '/partner/v1/pay-order/seller/product-orders/dispatch',
}

export enum NaverCommerceDeliveryCompanyCode {
  Hanjin = 'HANJIN',
}

export enum NaverCommerceDeliveryMethod {
  Direct = 'DIRECT_DELIVERY',
  Normal = 'DELIVERY',
}
