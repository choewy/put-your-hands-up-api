import { DateConditionDTO } from '@common';

import { EsmPlusSearchAccount } from './esm-plus-search-account';
import { EsmPlusTarget } from '../constants';

export class EsmPlusDownloadExcelFileParam {
  readonly siteGbn = 0;
  readonly searchDateType = 'ODD';
  readonly searchKey = 'ON';
  readonly searchKeyword = '';
  readonly searchStatus = 0;
  readonly searchAllYn = 'Y';
  readonly splitYn = 'yes';
  readonly searchOrderType = '';
  readonly searchPaking = false;
  readonly searchDistrType = 'AL';
  readonly searchDeliveryType = '';
  readonly searchTransPolicyType = '';
  readonly searchSDT!: string;
  readonly searchEDT!: string;
  readonly searchAccount!: string;

  constructor(target: EsmPlusTarget, searchAccount: EsmPlusSearchAccount, condition: DateConditionDTO) {
    this.searchSDT = condition.startDate;
    this.searchEDT = condition.endDate;

    switch (target) {
      case EsmPlusTarget.Gmarket:
        this.searchAccount = searchAccount.getGmarketAccount();
        break;

      case EsmPlusTarget.Auction:
        this.searchAccount = searchAccount.getAuctionAccount();
        break;
    }
  }
}
