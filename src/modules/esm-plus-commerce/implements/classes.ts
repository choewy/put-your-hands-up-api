import { EsmPlusCommerceDateCondition } from './interfaces';
import { EsmPlusCommerceTarget } from '../constants';

export class EsmPlusCommerceSearchAccount {
  private esm: string = '';
  private gmarket: string = '';
  private auction: string = '';

  public getEsmAccount() {
    return this.esm;
  }

  public setEsmAccount(account: string) {
    this.esm = account;
  }

  public getGmarketAccount() {
    return this.gmarket;
  }

  public setGmarketAccount(account: string) {
    this.gmarket = account;
  }

  public getAuctionAccount() {
    return this.auction;
  }

  public setAuctionAccount(account: string) {
    this.auction = account;
  }
}

export class EsmPlusCommerceConfirmOrderParam {
  readonly mID: string;
  readonly orderInfo: string;

  constructor(searchAccount: EsmPlusCommerceSearchAccount, orderKeys: string[]) {
    this.mID = searchAccount.getEsmAccount();
    this.orderInfo = orderKeys.join('^');
  }
}

export class EsmPlusCommerceSearchOrderParam {
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

  constructor(target: EsmPlusCommerceTarget, searchAccount: EsmPlusCommerceSearchAccount, condition: EsmPlusCommerceDateCondition) {
    this.searchSDT = condition.startDate;
    this.searchEDT = condition.endDate;

    switch (target) {
      case EsmPlusCommerceTarget.Gmarket:
        this.searchAccount = searchAccount.getGmarketAccount();
        break;

      case EsmPlusCommerceTarget.Auction:
        this.searchAccount = searchAccount.getAuctionAccount();
        break;
    }
  }
}

export class EsmPlusCommerceResetGridParam {
  readonly gridId = 'GED003';
  readonly exposeCount = 20;
  readonly isLocked = true;
  readonly gridCol = JSON.stringify([
    { text: '아이디', dataIndex: 'SiteID', hidden: false, locked: true },
    { text: '주문일자(결제확인전)', dataIndex: 'PayDate', hidden: false, locked: true },
    { text: '주문번호', dataIndex: 'SiteOrderNo', hidden: false, locked: true },
    { text: '수령인명', dataIndex: 'RcverName', hidden: false, locked: true },
    { text: '구매자명', dataIndex: 'BuyerName', hidden: false, locked: true },
    { text: '발송정책', dataIndex: 'TransType', hidden: false, locked: true },
    { text: '주문상태', dataIndex: 'TransDueStatus', hidden: false, locked: false },
    { text: '발송마감일', dataIndex: 'TransDueDate', hidden: false, locked: false },
    { text: '택배사명(발송방법)', dataIndex: 'DeliveryComp', hidden: false, locked: false },
    { text: '송장번호', dataIndex: 'InvoiceNo', hidden: false, locked: false },
    { text: '상품번호', dataIndex: 'GoodsNo', hidden: false, locked: false },
    { text: '상품명', dataIndex: 'GoodsName', hidden: false, locked: false },
    { text: '수량', dataIndex: 'OrderQty', hidden: false, locked: false },
    { text: '주문옵션', dataIndex: 'SelOption', hidden: false, locked: false },
    { text: '추가구성', dataIndex: 'AddOption', hidden: false, locked: false },
    { text: '사은품', dataIndex: 'FreeGift', hidden: false, locked: false },
    { text: '판매단가', dataIndex: 'SellPrice', hidden: false, locked: false },
    { text: '판매금액', dataIndex: 'OrderAmnt', hidden: false, locked: false },
    { text: '판매자 관리코드', dataIndex: 'SellerMngCode', hidden: false, locked: false },
    { text: '판매자 상세관리코드', dataIndex: 'SellerDetailMngCode', hidden: false, locked: false },
    { text: '수령인 휴대폰', dataIndex: 'RcverInfoCp', hidden: false, locked: false },
    { text: '수령인 전화번호', dataIndex: 'RcverInfoHt', hidden: false, locked: false },
    { text: '우편번호', dataIndex: 'ZipCode', hidden: false, locked: false },
    { text: '주소', dataIndex: 'RcverInfoAd', hidden: false, locked: false },
    { text: '배송시 요구사항', dataIndex: 'DeliveryMemo', hidden: false, locked: false },
    { text: '배송비', dataIndex: 'DeliveryFeeType', hidden: false, locked: false },
    { text: '배송비 금액', dataIndex: 'DeliveryFee', hidden: false, locked: false },
    { text: '배송번호', dataIndex: 'TransNo', hidden: false, locked: false },
    { text: '배송지연사유', dataIndex: 'TransScheduledReason', hidden: false, locked: false },
    { text: '수령인 통관번호', dataIndex: 'ReceiverEntryNo', hidden: false, locked: false },
    { text: 'SKU번호 및 수량', dataIndex: 'SkuString', hidden: false, locked: false },
    { text: '구매자ID', dataIndex: 'BuyerID', hidden: false, locked: false },
    { text: '구매자 휴대폰', dataIndex: 'BuyerCp', hidden: false, locked: false },
    { text: '구매자 전화번호', dataIndex: 'BuyerHt', hidden: false, locked: false },
    { text: '판매방식', dataIndex: 'MarketType', hidden: false, locked: false },
    { text: '주문종류', dataIndex: 'DistrType', hidden: false, locked: false },
    { text: '장바구니번호(결제번호)', dataIndex: 'CartNo', hidden: false, locked: false },
    { text: '결제완료일', dataIndex: 'DepositConfirmDate', hidden: false, locked: false },
    { text: '주문확인일자', dataIndex: 'OrderConfirmDate', hidden: false, locked: false },
    { text: '발송예정일', dataIndex: 'TransScheduledDate', hidden: false, locked: false },
    { text: '정산예정금액', dataIndex: 'SttlExpectedAmnt', hidden: false, locked: false },
    { text: '서비스이용료', dataIndex: 'ServiceUseAmnt', hidden: false, locked: false },
    { text: '판매자쿠폰할인', dataIndex: 'SellerCouponDcAmnt', hidden: false, locked: false },
    { text: '구매쿠폰적용금액', dataIndex: 'BuyerDCAmnt', hidden: false, locked: false },
    { text: '(옥션)우수회원할인', dataIndex: 'GreatMembDcAmnt', hidden: false, locked: false },
    { text: '복수구매할인', dataIndex: 'MultiBuyDcAmnt', hidden: false, locked: false },
    { text: '스마일캐시적립', dataIndex: 'SellerSmileCashAmnt', hidden: false, locked: false },
    { text: '제휴사명', dataIndex: 'PartnerName', hidden: false, locked: false },
  ])
    .replaceAll('"text"', 'text')
    .replaceAll('"dataIndex"', 'dataIndex')
    .replaceAll('"hidden"', 'hidden')
    .replaceAll('"locked"', 'locked')
    .replaceAll('"', "'");
}

export class EsmPlusCommerceDownloadExcelFileParam {
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

  constructor(target: EsmPlusCommerceTarget, searchAccount: EsmPlusCommerceSearchAccount, condition: EsmPlusCommerceDateCondition) {
    this.searchSDT = condition.startDate;
    this.searchEDT = condition.endDate;

    switch (target) {
      case EsmPlusCommerceTarget.Gmarket:
        this.searchAccount = searchAccount.getGmarketAccount();
        break;

      case EsmPlusCommerceTarget.Auction:
        this.searchAccount = searchAccount.getAuctionAccount();
        break;
    }
  }
}
