export enum NaverQueueName {
  Bull = 'naver',
  CollectOrder = 'naver:order',
  TransferInvoice = 'naver:invoice',
}

export enum NaverApiUrlPath {
  GetToken = '/partner/v1/oauth2/token',
  TransferInvoices = '/partner/v1/pay-order/seller/product-orders/dispatch',
}

export enum NaverDeliveryCompanyCode {
  Hanjin = 'HANJIN',
}

export enum NaverDeliveryMethod {
  Direct = 'DIRECT_DELIVERY',
  Normal = 'DELIVERY',
}
