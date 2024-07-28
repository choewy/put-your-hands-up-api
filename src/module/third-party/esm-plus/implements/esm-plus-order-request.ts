import { CredentialsDTO, DateConditionDTO, TargetName } from '@common';
import { EsmPlusRequestUrl } from '@domain';
import { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { EsmPlusConfirmOrderParam } from './esm-plus-confirm-order-param';
import { EsmPlusSearchAccount } from './esm-plus-search-account';
import { EsmPlusSearchOrderParam } from './esm-plus-search-orders-param';
import { EsmPlusSearchNewOrdersResponse } from './interfaces';

export class EsmPlusOrderRequest {
  private readonly searchAccount = new EsmPlusSearchAccount();

  constructor(
    private readonly target: TargetName,
    private readonly credentials: CredentialsDTO,
    private readonly request: AxiosInstance,
  ) {}

  // TODO throw custom error
  async getSearchAccount() {
    const { data } = await this.request.get(EsmPlusRequestUrl.GetId);

    const html = cheerio.load(data);
    const select = html('#searchAccount');
    const options = select.children('option');

    for (const option of options) {
      const text = html(option).text();
      const value = html(option).val() as string;

      if (text === '전체') {
        this.searchAccount.setEsmAccount(value);
        continue;
      }

      if (text.startsWith('G_') && text.includes('전체') === false) {
        this.searchAccount.setGmarketAccount(value);
        continue;
      }

      if (text.startsWith('A_') && text.includes('전체') === false) {
        this.searchAccount.setAuctionAccount(value);
      }
    }
  }

  // TODO throw custom error
  private async searchNewOrders(condition: DateConditionDTO) {
    const body = new EsmPlusSearchOrderParam(this.target, this.searchAccount, condition);
    const response = await this.request.post<EsmPlusSearchNewOrdersResponse>(EsmPlusRequestUrl.SearchNewOrders, body);

    return response.data.data.map((order) => [order.OrderNo, 1, this.credentials.account].join(','));
  }

  // TODO throw custom error
  private async confirmOrders(orderKeys: string[]) {
    const body = new EsmPlusConfirmOrderParam(this.searchAccount, orderKeys);
    await this.request.post(EsmPlusRequestUrl.ConfirmOrders, body);
  }

  async searchNewOrdersAndConfirmOrders(condition: DateConditionDTO, confirmExecution: boolean) {
    while (true) {
      const orderKeys = await this.searchNewOrders(condition);

      if (orderKeys.length === 0 || confirmExecution === false) {
        break;
      }

      await this.confirmOrders(orderKeys);
    }
  }
}
