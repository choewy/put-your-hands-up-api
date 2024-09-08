import { NaverTransferInvoiceTargetDTO } from '../dtos';

export class NaverTransferInvoiceTargetMap extends Map<string, NaverTransferInvoiceTargetDTO[]> {
  constructor(targets: NaverTransferInvoiceTargetDTO[]) {
    super();

    for (const target of targets) {
      const targetArrays = this.has(target.orderId) ? this.get(target.orderId) : [];

      this.set(target.orderId, targetArrays.concat(target));
    }
  }

  public getAndDelete(orderId: string) {
    const targets = this.get(orderId);

    this.delete(orderId);

    return targets;
  }
}
