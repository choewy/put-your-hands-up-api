export enum EsmPlusPageURL {
  Login = 'https://signin.esmplus.com/login',
}

export enum EsmPlusApiUrl {}

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
