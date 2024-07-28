export enum EsmPlusPageURL {
  Login = 'https://signin.esmplus.com/login',
}

export enum EsmPlusRequestUrl {
  GetId = 'https://www.esmplus.com/Escrow/Order/NewOrder?menuCode=TDM105',
  SearchNewOrders = 'https://www.esmplus.com/Escrow/Order/NewOrderSearch',
  ConfirmOrders = 'https://www.esmplus.com/Escrow/Order/OrderCheck',
  ResetGrid = 'https://www.esmplus.com/CommonPopUp/SetGridSetUp',
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
