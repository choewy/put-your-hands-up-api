import {
  NaverAddressType,
  NaverClaimReason,
  NaverClaimStatus,
  NaverClaimType,
  NaverCollectStauts,
  NaverCommissionPrePayStatus,
  NaverDelayedDispatchReason,
  NaverDeliveryCompanyCode,
  NaverDeliveryMethod,
  NaverDeliveryStatus,
  NaverEntryMethod,
  NaverGiftReceivingStatus,
  NaverHoldbackReason,
  NaverHoldbackStatus,
  NaverLastChangedType,
  NaverPickupLocationType,
  NaverPlaceOrderStatus,
  NaverProductOrderStatus,
  NaverSellerBurdenMultiplePurchaseDiscountType,
} from './enums';

export interface NaverErrorResponse {
  tractId: string;
  timestamp: string;
  code: string;
  message: string;
}

export interface NaverOAuthTokenRequestBody {
  type: 'SELLER';
  grant_type: 'client_credentials';
  account_id: string;
  client_id: string;
  client_secret_sign: string;
  timestamp: number;
}

export interface NaverOAuthTokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface NaverLastChangedStatusRequestParam {
  lastChangedType: NaverLastChangedType;
  lastChangedFrom: string;
  lastChangedTo: string;
  moreSequence?: string;
  limitCount?: number;
}

export interface NaverLastChangedStatusResponse {
  timestamp: string;
  data: NaverLastChangedStatusesResponseData;
}

export interface NaverLastChangedStatusesResponseData {
  count: number;
  lastChangeStatuses: NaverLastChangedStatus[];
  more?: NaverLastChangedStatusMore;
}

export interface NaverLastChangedStatusMore {
  moreSequence: string;
  moreFrom: string;
}

export interface NaverLastChangedStatus {
  orderId: string;
  productOrderId: string;
  productOrderStatus: NaverProductOrderStatus;
  lastChangedDate: string;
  lastChangedType: NaverLastChangedType;
  receiverAddressChanged: boolean;
  paymentDate?: string;
  claimType?: NaverClaimType;
  claimStatus?: NaverClaimStatus;
  giftReceivingStatus?: NaverGiftReceivingStatus;
}

export interface NaverConfirmSuccessInfo {
  productOrderId: string;
  isReceiverAddressChanged: boolean;
}

export interface NaverConfirmFailInfo {
  productOrderId: string;
  code: string;
  message: string;
}

export interface NaverConfirmProductOrdersResult {
  successProductOrderInfos: NaverConfirmSuccessInfo[];
  failProductOrderInfos: NaverConfirmFailInfo[];
}

export interface NaverConfirmProductOrdersResponse {
  traceId: string;
  timestamp: string;
  data: NaverConfirmProductOrdersResult;
}

export interface NaverAddress {
  addressType: NaverAddressType;
  baseAddress: string;
  city: string;
  country: string;
  detailedAddress: string;
  name: string;
  state: string;
  tel1: string;
  tel2: string;
  zipCode: string;
  isRoadNameAddress: boolean;
  pickupLocationType: NaverPickupLocationType;
  pickupLocationContent: string;
  entryMethod: NaverEntryMethod;
  entryMethodContent: string;
}

export interface NaverHopeDelivery {
  region: string;
  additionalFee: number;
  hopeDeliveryYmd: string;
  hopeDeliveryHm: string;
  changeReason: string;
  changer: string;
}

export interface NaverProductOrder {
  claimType: NaverClaimType;
  claimStatus: NaverClaimStatus;
  delayedDispatchReason: NaverDelayedDispatchReason;
  delayedDispatchDetailedReason: string;
  decisionDate: string;
  deliveryDiscountAmount: number;
  deliveryFeeAmount: number;
  deliveryPolicyType: string;
  expectedDeliveryMethod: NaverDeliveryMethod;
  freeGift: string;
  mallId: string;
  optionCode: string;
  optionPrice: number;
  packageNumber: string;
  placeOrderDate: string;
  placeOrderStatus: NaverPlaceOrderStatus;
  productClass: string;
  productDiscountAmount: number;
  productId: string;
  productName: string;
  productOption: string;
  productOrderId: string;
  productOrderStatus: NaverProductOrderStatus;
  quantity: number;
  sectionDeliveryFee: number;
  sellerProductCode: string;
  shippingAddress: NaverAddress;
  shippingDueDate: string;
  shippingFeeType: string;
  shippingMemo: string;
  takingAddress: NaverAddress;
  totalPaymentAmount: number;
  totalProductAmount: number;
  unitPrice: number;
  sellerBurdenDiscountAmount: number;
  commissionRatingType: string;
  commissionPrePayStatus: NaverCommissionPrePayStatus;
  paymentCommission: number;
  saleCommission: number;
  expectedSettlementAmount: number;
  inflowPath: string;
  itemNo: string;
  optionManageCode: string;
  sellerCustomCode1: string;
  sellerCustomCode2: string;
  claimId: string;
  channelCommission: number;
  individualCustomUniqueCode: string;
  productImediateDiscountAmount: number;
  productProductDiscountAmount: number;
  productMultiplePurchaseDiscountAmount: number;
  sellerBurdenImediateDiscountAmount: number;
  sellerBurdenProductDiscountAmount: number;
  sellerBurdenMultiplePurchaseDiscountAmount: number;
  knowledgeShoppingSellingInterlockCommission: number;
  giftReceivingStatus: NaverGiftReceivingStatus;
  sellerBurdenStoreDiscountAmount: number;
  sellerBurdenMultiplePurchaseDiscountType: NaverSellerBurdenMultiplePurchaseDiscountType;
  logisticsCompanyId: string;
  logisticsCenterId: string;
  hopeDelivery: NaverHopeDelivery;
}

export interface NaverOrder {
  ordererNo: string;
  orderId: string;
  ordererId: string;
  ordererName: string;
  ordererTel: string;
  chargeAmountPaymentAmount: number;
  checkoutAccumulationPaymentAmount: number;
  generalPaymentAmount: number;
  naverMileagePaymentAmount: number;
  orderDate: string;
  orderDiscountAmount: string;
  paymentDate: string;
  paymentDueDate: string;
  paymentMeans: string;
  isDeliveryMemoParticularInput: string;
  payLocationType: string;
  payLaterPaymentAmount: number;
}

export interface NaverDelivery {
  deliveredDate: string;
  deliveryCompany: NaverDeliveryCompanyCode;
  deliveryMethod: NaverDeliveryMethod;
  deliveryStatus: NaverDeliveryStatus;
  isWrongTrackingNumber: boolean;
  pickupDate: string;
  sendDate: string;
  trackingNumber: string;
  wrongTrackingNumberRegisteredDate: string;
  wrongTrackingNumberType: string;
}

export interface NaverCancel {
  cancelApprovalDate: string;
  cancelCompletedDate: string;
  cancelDetailedReason: string;
  cancelReason: NaverClaimReason;
  claimRequestDate: string;
  claimStatus: NaverClaimStatus;
  refundExpectedDate: string;
  refundStandbyReason: string;
  refundStandbyStatus: string;
  requestChannel: string;
}

export interface NaverExchange {
  claimDeliveryFeeDemandAmount: number;
  claimDeliveryFeePayMeans: string;
  claimDeliveryFeePayMethod: string;
  claimRequestDate: string;
  claimStatus: NaverClaimStatus;
  collectAddress: NaverAddress;
  collectCompletedDate: string;
  collectDeliveryCompany: NaverDeliveryCompanyCode;
  collectDeliveryMethod: NaverDeliveryMethod;
  collectStatus: NaverCollectStauts;
  collectTrackingNumber: string;
  etcFeeDemandAmount: number;
  etcFeePayMeans: string;
  etcFeePayMethod: string;
  exchangeDetailedReason: string;
  exchangeReason: NaverClaimReason;
  holdbackDetailedReason: string;
  holdbackReason: NaverHoldbackReason;
  holdbackStatus: NaverHoldbackStatus;
  reDeliveryMethod: NaverDeliveryMethod;
  reDeliveryStatus: NaverDeliveryStatus;
  reDeliveryCompany: NaverDeliveryCompanyCode;
  reDeliveryTrackingNumber: string;
  requestChannel: string;
  returnReceiveAddress: NaverAddress;
  holdbackConfigDate: string;
  holdbackConfigurer: string;
  holdbackReleaseDate: string;
  holdbackReleaser: string;
  claimDeliveryFeeProductOrderIds: string;
  reDeliveryOperationDate: string;
  claimDeliveryFeeDiscountAmount: number;
  remoteAreaCostChargeAmount: number;
}

export interface NaverReturn {
  claimDeliveryFeeDemandAmount: number;
  claimDeliveryFeePayMeans: string;
  claimDeliveryFeePayMethod: string;
  claimRequestDate: string;
  claimStatus: NaverClaimStatus;
  collectAddress: NaverAddress;
  collectCompletedDate: string;
  collectDeliveryCompany: NaverDeliveryCompanyCode;
  collectDeliveryMethod: NaverDeliveryMethod;
  collectStatus: NaverCollectStauts;
  collectTrackingNumber: string;
  etcFeeDemandAmount: number;
  etcFeePayMeans: string;
  etcFeePayMethod: string;
  holdbackDetailedReason: string;
  holdbackReason: NaverHoldbackReason;
  holdbackStatus: NaverHoldbackStatus;
  refundExpectedDate: string;
  refundStandbyReason: string;
  refundStandbyStatus: string;
  requestChannel: string;
  returnDetailedReason: string;
  returnReason: NaverClaimReason;
  returnReceiveAddress: NaverAddress;
  returnCompletedDate: string;
  holdbackConfigDate: string;
  holdbackConfigurer: string;
  holdbackReleaseDate: string;
  holdbackReleaser: string;
  claimDeliveryFeeProductOrderIds: string;
  claimDeliveryFeeDiscountAmount: number;
  remoteAreaCostChargeAmount: number;
}

export interface NaverProductOrdersResponseData {
  productOrder: NaverProductOrder;
  order: NaverOrder;
  delivery?: NaverDelivery;
  cancel?: NaverCancel;
  exchange?: NaverExchange;
  return?: NaverReturn;
}

export interface NaverProductOrdersResponse {
  tractId: string;
  timestamp: string;
  data: NaverProductOrdersResponseData[];
}
