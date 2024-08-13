export interface EsmPlusAccountSelector {
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

export interface EsmPlusNewOrderData {
  OrderNo: string;
  GiftStatusType: string;
}

export interface EsmPlusSearchNewOrdersResponse {
  success: boolean;
  total: number;
  IacTabCount: number;
  GmktTabCount: number;
  message: string;
  data: EsmPlusNewOrderData[];
}
