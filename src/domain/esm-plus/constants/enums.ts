export enum EsmPlusQueueName {
  Bull = 'esm-plus',
  CollectOrder = 'esm-plus:order',
  TransferInvoice = 'esm-plus:invoice',
}

export enum EsmPlusTarget {
  Gmarket = 'gmarket',
  Auction = 'auction',
}

export enum EsmPlusPageUrl {
  Login = 'https://signin.esmplus.com/login',
}

export enum EsmPlusApiUrl {
  GetId = 'https://www.esmplus.com/Escrow/Order/NewOrder?menuCode=TDM105',
  SearchNewOrders = 'https://www.esmplus.com/Escrow/Order/NewOrderSearch',
  ConfirmOrders = 'https://www.esmplus.com/Escrow/Order/OrderCheck',
  ResetGrid = 'https://www.esmplus.com/CommonPopUp/SetGridSetUp',
  DownloadExcel = 'https://www.esmplus.com/Escrow/Delivery/GeneralDeliveryExcel',
}

export enum EsmLoginPageElement {
  TabClassName = '.box__tab',
  InputAccountID = '#typeMemberInputId01',
  InputPasswordID = '#typeMemberInputPassword01',
  FormClassName = '.box__submit',
  ErrorLabelClassName = '.text--red',
}

export enum EsmPlusLoginTabIndex {
  Master = 0,
  Gmarket = 1,
  Auction = 2,
}

export const EsmPlusloginTabIndexValues = [
  EsmPlusLoginTabIndex.Master,
  EsmPlusLoginTabIndex.Gmarket,
  EsmPlusLoginTabIndex.Auction,
] as const;
