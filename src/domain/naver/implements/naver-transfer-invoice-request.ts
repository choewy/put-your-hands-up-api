import { AxiosHeaders } from 'axios';
import { DateTime } from 'luxon';

import { NaverDeliveryCompanyCode, NaverDeliveryMethod } from '../constants';
import { NaverTransferInvoiceTargetDTO } from '../dtos';

export class NaverTransferInvoiceRequestHeader extends AxiosHeaders {
  constructor(accessToken: string) {
    super();

    this.set('Content-Type', 'application/json');
    this.set('Authorization', `Bearer ${accessToken}`);
  }
}

export class NaverTransferInvoiceTargetRow {
  dispatchDate = DateTime.local().toISO({ includeOffset: true });

  productOrderId!: string;
  deliveryCompanyCode!: NaverDeliveryCompanyCode;
  deliveryMethod!: NaverDeliveryMethod;
  trackingNumber!: string;

  constructor(target: NaverTransferInvoiceTargetDTO) {
    this.productOrderId = target.productOrderId;
    this.deliveryCompanyCode = target.deliveryCompanyCode;
    this.deliveryMethod = target.isDirectly ? NaverDeliveryMethod.Direct : NaverDeliveryMethod.Normal;
    this.trackingNumber = target.trackingNumber;
  }
}

export class NaverTransferInvoiceRequestBody {
  dispatchProductOrders: NaverTransferInvoiceTargetRow[];

  constructor(targets: NaverTransferInvoiceTargetDTO[]) {
    this.dispatchProductOrders = targets.map((target) => new NaverTransferInvoiceTargetRow(target));
  }
}
