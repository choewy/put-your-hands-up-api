import { DynamicModuleAsyncOptions, DynamicModuleOptions } from '@common';

export interface EsmPlusCommerceModuleOptions extends DynamicModuleOptions {
  useConfirmOrders: boolean;
  useVisibleBrowser: boolean;
}

export interface EsmPlusCommerceModuleAsyncOptions extends DynamicModuleAsyncOptions<Omit<EsmPlusCommerceModuleOptions, 'isGlobal'>> {}

export interface EsmPlusCommerceCredentials {
  account: string;
  password: string;
}

export interface EsmPlusCommerceDateCondition {
  startDate: string;
  endDate: string;
}

export interface EsmPlusCommerceAccountSelector {
  master: string;
  gmarket: {
    master?: string;
    user?: string;
  };
  auction: {
    master?: string;
    user?: string;
  };
}

export interface EsmPlusCommerceNewOrderData {
  OrderNo: string;
  GiftStatusType: string;
}

export interface EsmPlusCommerceSearchNewOrdersResponse {
  success: boolean;
  total: number;
  IacTabCount: number;
  GmktTabCount: number;
  message: string;
  data: EsmPlusCommerceNewOrderData[];
}
