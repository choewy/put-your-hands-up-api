import { DateConditionDTO, TargetName } from '@common';

import { EsmPlusSearchAccount } from './esm-plus-search-account';

export class EsmPlusSearchOrderParam {
  readonly page = 1;
  readonly limit = 50;
  readonly siteGbn = 1;
  readonly searchDateType = 'ODD';
  readonly searchKey = 'ON';
  readonly searchKeyword = '';
  readonly searchDistrType = 'AL';
  readonly searchAllYn = 'N';
  readonly searchTransPolicyType = '';
  readonly SortFeild = 'PayDate';
  readonly SortType = 'Desc';
  readonly start = 0;
  readonly searchSDT!: string;
  readonly searchEDT!: string;
  readonly searchAccount!: string;

  constructor(target: TargetName, searchAccount: EsmPlusSearchAccount, condition: DateConditionDTO) {
    this.searchSDT = condition.startDate;
    this.searchEDT = condition.endDate;

    switch (target) {
      case TargetName.Gmarket:
        this.searchAccount = searchAccount.getGmarketAccount();
        break;

      case TargetName.Auction:
        this.searchAccount = searchAccount.getAuctionAccount();
        break;
    }
  }
}
