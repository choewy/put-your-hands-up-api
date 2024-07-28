import { EsmPlusSearchAccount } from './esm-plus-search-account';

export class EsmPlusConfirmOrderParam {
  readonly mID: string;
  readonly orderInfo: string;

  constructor(searchAccount: EsmPlusSearchAccount, orderKeys: string[]) {
    this.mID = searchAccount.getEsmAccount();
    this.orderInfo = orderKeys.join('^');
  }
}
