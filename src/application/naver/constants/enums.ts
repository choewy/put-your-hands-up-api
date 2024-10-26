export enum NaverBaseURL {
  Sandbox = 'https://sandbpx-api.commerce.naver.com',
  Production = 'https://api.commerce.naver.com',
}

export enum NaverURLPath {
  OAuthToken = 'partner/v1/oauth2/token',
  ProductOrdersLastChangedStatuses = 'partner/v1/pay-order/seller/product-orders/last-changed-statuses',
  ProductOrdersQuery = 'partner/v1/pay-order/seller/product-orders/query',
  ProductOrdersConfirm = 'partner/v1/pay-order/seller/product-orders/confirm',
  ProductOrdersDispatch = 'partner/v1/pay-order/seller/product-orders/dispatch',
}

export enum NaverLastChangedType {
  PayWating = 'PAY_WATING',
  Payed = 'PAYED',
  ExchangeOption = 'EXCHANGE_OPTION',
  DeliveryAddressChanged = 'DELIVERY_ADDRESS_CHANGED',
  GiftReceived = 'GIFT_RECEIVED',
  ClaimRejected = 'CLAIM_REJECTED',
  Dispatched = 'DISPATCHED',
  ClaimRequested = 'CLAIM_REQUESTED',
  CollectDone = 'COLLECT_DONE',
  ClaimHoldbackReleased = 'CLAIM_HOLDBACK_RELEASED',
  ClaimCompleted = 'CLAIM_COMPLETED',
  PurchaseDecided = 'PURCHASE_DECIDED',
}

export enum NaverProductOrderStatus {
  PaymentWating = 'PAYMENT_WAITING',
  Payed = 'Payed',
  Delivering = 'DELIVERING',
  Delivered = 'DELIVERED',
  PurchaseDecided = 'PURCHASE_DECIDED',
  Exchanged = 'EXCHANGED',
  Canceled = 'CANCELED',
  Returned = 'RETURNED',
  CanceledByNoPayment = 'CANCELED_BY_NOPAYMENT',
}

export enum NaverClaimType {
  Cancel = 'CANCEL',
  Return = 'RETURN',
  Exxhange = 'EXCHANGE',
  PurchaseDecisionHoldback = 'PURCHASE_DECISION_HOLDBACK',
  AdminCancel = 'ADMIN_CANCEL',
}

export enum NaverClaimStatus {
  CancelRequest = 'CANCEL_REQUEST',
  Canceling = 'CANCELING',
  CancelDone = 'CANCEL_DONE',
  CancelReject = 'CANCEL_REJECT',
  ReturnRequest = 'RETURN_REQUEST',
  ExchangeRequest = 'EXCHANGE_REQUEST',
  Collecting = 'COLLECTING',
  CollectDone = 'COLLECT_DONE',
  ExchangeRedelivering = 'EXCHANGE_REDELIVERING',
  ReturnDone = 'RETURN_DONE',
  ExchangeDone = 'EXCHANGE_DONE',
  ReturnReject = 'RETURN_REJECT',
  ExchangeReject = 'EXCHANGE_REJECT',
  PurchaseDecisionHoldback = 'PURCHASE_DECISION_HOLDBACK',
  PurchaseDecisionRequest = 'PURCHASE_DECISION_REQUEST',
  PurchaseDecisionHolebackRelease = 'PURCHASE_DECISION_HOLDBACK_RELEASE',
  AdminCanceling = 'ADMIN_CANCELING',
  AdminCancelDone = 'ADMIN_CANCEL_DONE',
  AdminCancelReject = 'ADMIN_CANCEL_REJECT',
}

export enum NaverGiftReceivingStatus {
  WaigForReceiving = 'WAIT_FOR_RECEIVING',
  Received = 'RECEIVED',
}

export enum NaverAddressType {
  Domestic = 'DOMESTIC',
  Foreign = 'FOREIGN',
}

export enum NaverPickupLocationType {
  FrontOfDoor = 'FRONT_OF_DOOR',
  ManagementOffice = 'MANAGEMENT_OFFICE',
  DirectReceive = 'DIRECT_RECEIVE',
  Other = 'OTHER',
}

export enum NaverEntryMethod {
  LobbyPassword = 'LOBBY_PW',
  ManagementOffice = 'MANAGEMENT_OFFICE',
  Free = 'FREE',
  Other = 'OTHER',
}

export enum NaverClaimReason {
  IntentChanged = 'INTENT_CHANGED',
  ColorAndSize = 'COLOR_AND_SIZE',
  WrongOrder = 'WRONG_ORDER',
  ProductUnsatisfied = 'PRODUCT_UNSATISFIED',
  DelayedDelivery = 'DELAYED_DELIVERY',
  SoldOut = 'SOLD_OUT',
  DroppedDelivery = 'DROPPED_DELIVERY',
  NotYetDelivery = 'NOT_YET_DELIVERY',
  Broken = 'BROKEN',
  IncorrectInfo = 'INCORRECT_INFO',
  WrongDelivery = 'WRONG_DELIVERY',
  WrongOption = 'WRONG_OPTION',
  SimpleIntentChanged = 'SIMPLE_INTENT_CHANGED',
  MistakeOrder = 'MISTAKE_ORDER',
  DelayedDeliveryByPurchaser = 'DELAYED_DELIVERY_BY_PURCHASER',
  IncorrectInfoVyPurchaser = 'INCORRECT_INFO_BY_PURCHASER',
  ProductUnsatisfiedByPurchaser = 'PRODUCT_UNSATISFIED_BY_PURCHASER',
  NotYetDiscussion = 'NOT_YET_DISCUSSION',
  OutOfStock = 'OUT_OF_STOCK',
  SaleIntentChanged = 'SALE_INTENT_CHANGED',
  NotYetPayment = 'NOT_YET_PAYMENT',
  NotYetReceive = 'NOT_YET_RECEIVE',
  WrongDelayedDelivery = 'WRONG_DELAYED_DELIVERY',
  BrokenAndBad = 'BROKEN_AND_BAD',
  ReceivingDueDateOver = 'RECEIVING_DUE_DATE_OVER',
  ReceiverMismatched = 'RECEIVER_MISMATCHED',
  GiftIntentChanged = 'GIFT_INTENT_CHANGED',
  GiftRefusal = 'GIFT_REFUSAL',
  MinorRestricted = 'MINOR_RESTRICTED',
  ReceivingBlocked = 'RECEIVING_BLOCKED',
  OrderQuantity = 'UNDER_QUANTITY',
  AsyncFailPayment = 'ASYNC_FAIL_PAYMENT',
  AsyncLongWaitPayment = 'ASYNC_LONG_WAIT_PAYMENT',
  Etc = 'ETC',
}

export enum NaverDeliveryMethod {
  Delivery = 'DELIVERY',
  DirectDelivery = 'DIRECT_DELIVERY',
  GoodsFlowIssueService = 'GDFW_ISSUE_SVC',
  VisitReceipt = 'VISIT_RECEIPT',
  QuickService = 'QUICK_SVC',
  Nothing = 'NOTHING',
  ReturnDesignated = 'RETURN_DESIGNATED',
  ReturnDelivery = 'RETURN_DELIVERY',
  ReturnIndividual = 'RETURN_INDIVIDUAL',
  ReturnMerchant = 'RETURN_MERCHANT',
  Unknown = 'UNKNOWN',
}

export enum NaverDelayedDispatchReason {
  ProductPrepare = 'PRODUCT_PREPARE',
  CustomerRequest = 'CUSTOMER_REQUEST',
  CustomBuild = 'CUSTOM_BUILD',
  ReservedDispatch = 'RESERVED_DISPATCH',
  OverseaDelivery = 'OVERSEA_DELIVERY',
  Etc = 'ETC',
}

export enum NaverPlaceOrderStatus {
  Ok = 'OK',
  NotYet = 'NOT_YET',
  Cancel = 'CANCEL',
}

export enum NaverDeliveryCompanyCode {
  HANJIN = 'HANJIN',
  CJGLS = 'CJGLS',
  KGB = 'KGB',
  EPOST = 'EPOST',
  RegistPost = 'REGISTPOST',
  HYUNDAI = 'HYUNDAI',
  DAESIN = 'DAESIN',
  ILYANG = 'ILYANG',
  KYEONGDONG = 'KDEXP',
  CHUNIL = 'CHUNIL',
  Etc = 'CH1',
  HABDONG = 'HDEXP',
  GSPostbox = 'CVSNET',
  DHL = 'DHL',
  FEDEX = 'FEDEX',
  GSMNTON = 'GSMNTON',
  WARPEX = 'WARPEX',
  WIZWA = 'WIZWA',
  EMS = 'EMS',
  DHLDE = 'DHLDE',
  ACI = 'ACIEXPRESS',
  EZUSA = 'EZUSA',
  PANTOS = 'PANTOS',
  UPS = 'UPS',
  LOTTE_GLOBAL = 'HLCGLOBAL',
  CJ_GLOBAL = 'KOREXG',
  TNT = 'TNT',
  SEONGWON = 'SWGEXP',
  DAEWOON = 'DAEWOON',
  USPS = 'USPS',
  I_PARCEL = 'IPARCEL',
  KUNYOUNG = 'KUNYOUNG',
  HPL = 'HPL',
  SLX = 'SLX',
  HONAM = 'HONAM',
  GSI = 'GSIEXPRESS',
  SEBANG = 'SEBANG',
  NONGHYUP = 'NONGHYUP',
  CU_PARCEL = 'CUPARCEL',
  AIRWAY = 'AIRWAY',
  HOMEPICK = 'HOMEPICK',
  APEX = 'APEX',
  CWAY = 'CWAYEXPRESS',
  YONGMA = 'YONGMA',
  EURO_PARCEL = 'EUROPARCEL',
  KGSL = 'KGSL',
  GOS = 'GOS',
  GSPostBoxQuick = 'GSPOSTBOX',
  ADCAIR = 'ADCAIR',
  DONGGANG = 'DONGGANG',
  KYEONGIN = 'KIN',
  HANWOORI = 'HANWOORI',
  LG = 'LGLOGISTICS',
  GeneralPost = 'GENERALPOST',
  HANDALUM = 'HANDALUM',
  HOWSER = 'HOWSER',
  WEVILL = 'WEVILL',
  ACE = 'ACE',
  QXPRESS = 'QXPRESS',
  LINE = 'LINEEXP',
  SMARTLOGIS = 'SMARTLOGIS',
  DAELIM = 'DAELIM',
  EUNHA = 'EUNHA',
  HOME_INNOVATION = 'HOMEINNO',
  HYBRID = 'HYBRID',
  WOORIHANBANG = 'WOORIHB',
  YJS_WORLD = 'YJSWORLD',
  YJS_BRITISH = 'YJS',
  CR = 'CRLX',
  ANYTRACK = 'ANYTRACK',
  BRIDGE = 'BRIDGE',
  GPS = 'GPSLOGIX',
  ESTHER = 'ESTHER',
  LOTOS = 'LOTOS',
  UFREIGHT = 'UFREIGHT',
  IK = 'IK',
  SUNGHUN = 'SUNGHUN',
}

export enum NaverDeliveryStatus {
  CollectRequest = 'COLLECT_REQUEST',
  CollectWait = 'COLLECT_WAIT',
  CollectCargo = 'COLLECT_CARGO',
  DeliveryCompletion = 'DELIVERY_COMPLETION',
  DeliveryFail = 'DELIVERY_FAIL',
  WrongInvoice = 'WRONG_INVOICE',
  CollectCargoFail = 'COLLECT_CARGO_FAIL',
  CollectCargoCancel = 'COLLECT_CARGO_CANCEL',
  NotTracking = 'NOT_TRACKING',
}

export enum NaverCollectStauts {
  NotRequested = 'NOT_REQUESTED',
  CollectRequestToAgent = 'COLLECT_REQUEST_TO_AGENT',
  CollectRequestToDeliveryCompany = 'COLLECT_REQUEST_TO_DELIVERY_COMPANY',
  CollectWating = 'COLLECT_WAITING',
  CollectFailed = 'COLLECT_FAILED',
  CollectCanceled = 'COLLECT_CANCELED',
  Delivering = 'DELIVERING',
  Delivered = 'DELIVERED',
  DeliveryFailed = 'DELIVERY_FAILED',
  WrongInvoice = 'WRONG_INVOICE',
}

export enum NaverHoldbackReason {
  ReturnDeliveryFee = 'RETURN_DELIVERYFEE',
  ExtraFee = 'EXTRAFEEE',
  ReturnDelivertyFeeAndExtraFee = 'RETURN_DELIVERYFEE_AND_EXTRAFEEE',
  ReturnProductNotDelivered = 'RETURN_PRODUCT_NOT_DELIVERED',
  ExchangeDeliveryFee = 'EXCHANGE_DELIVERYFEE',
  ExchangeExtraFee = 'EXCHANGE_EXTRAFEE',
  ExchangeProductReady = 'EXCHANGE_PRODUCT_READY',
  ExchangeProductNotDelivered = 'EXCHANGE_PRODUCT_NOT_DELIVERED',
  ExchangeHoldback = 'EXCHANGE_HOLDBACK',
  SellerConfirmNeed = 'SELLER_CONFIRM_NEED',
  PurchaserConfirmNeed = 'PURCHASER_CONFIRM_NEED',
  SellerRemit = 'SELLER_REMIT',
  Etc = 'ETC',
  Etc2 = 'ETC2',
}

export enum NaverHoldbackStatus {
  Holdback = 'HOLDBACK',
  Released = 'RELEASED',
}

export enum NaverCommissionPrePayStatus {
  GeneralProduct = 'GENERAL_PRD',
  PrePayBefore = 'PRE_PAY_PRD_NO_PAY',
  PrePayAfter = 'PRE_PAY_PRD_PAYED',
}

export enum NaverSellerBurdenMultiplePurchaseDiscountType {
  IgnoreQuantity = 'IGNORE_QUANTITY',
  Quantity = 'QUANTITY',
}
