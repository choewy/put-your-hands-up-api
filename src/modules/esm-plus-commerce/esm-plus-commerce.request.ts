import { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { EsmPlusApiUrl, EsmPlusCommerceTarget } from './constants';
import {
  EsmPlusCommerceDateCondition,
  EsmPlusCommerceConfirmOrderParam,
  EsmPlusCommerceConfirmOrdersError,
  EsmPlusCommerceDownloadExcelFileError,
  EsmPlusCommerceDownloadExcelFileParam,
  EsmPlusCommerceResetGridError,
  EsmPlusCommerceResetGridParam,
  EsmPlusCommerceSearchAccount,
  EsmPlusCommerceSearchNewOrdersEmptyArrayError,
  EsmPlusCommerceSearchNewOrdersError,
  EsmPlusCommerceSearchNewOrdersResponse,
  EsmPlusCommerceSearchOrderParam,
} from './implements';

export class EsmPlusCommerceRequest {
  private readonly searchAccount = new EsmPlusCommerceSearchAccount();

  constructor(
    private readonly target: EsmPlusCommerceTarget,
    private readonly axios: AxiosInstance,
  ) {}

  async getSearchAccount() {
    const { data } = await this.axios.get(EsmPlusApiUrl.GetId);

    const html = cheerio.load(data);
    const select = html('#searchAccount');
    const options = select.children('option');

    for (const option of options) {
      const text = html(option).text();
      const value = html(option).val() as string;

      switch (true) {
        case text === '전체':
          this.searchAccount.setEsmAccount(value);
          break;

        case text.startsWith('G_') && text.includes('전체') === false:
          this.searchAccount.setGmarketAccount(value);
          break;

        case text.startsWith('A_') && text.includes('전체') === false:
          this.searchAccount.setAuctionAccount(value);
          break;
      }
    }
  }

  async searchNewOrdersAndConfirmOrders(condition: EsmPlusCommerceDateCondition, confirmExecution: boolean) {
    while (true) {
      const orderKeys = await this.searchNewOrders(condition);

      if (orderKeys.length === 0 || confirmExecution === false) {
        break;
      }

      await this.confirmOrders(orderKeys);
    }
  }

  private async searchNewOrders(condition: EsmPlusCommerceDateCondition) {
    const body = new EsmPlusCommerceSearchOrderParam(this.target, this.searchAccount, condition);
    const response = await this.axios.post<EsmPlusCommerceSearchNewOrdersResponse>(EsmPlusApiUrl.SearchNewOrders, body).catch((e) => {
      throw new EsmPlusCommerceSearchNewOrdersError(e);
    });

    const orderKeys = new Map<string, string>();

    if (Array.isArray(response?.data?.data) === false) {
      throw new EsmPlusCommerceSearchNewOrdersEmptyArrayError(response?.data?.data);
    }

    for (const order of response.data.data) {
      if (['선물수락대기'].includes(order.GiftStatusType)) {
        continue;
      }

      orderKeys.set(order.OrderNo, order.OrderNo);
    }

    return Array.from(orderKeys.values());
  }

  private async confirmOrders(orderKeys: string[]) {
    const body = new EsmPlusCommerceConfirmOrderParam(this.searchAccount, orderKeys);
    await this.axios.post(EsmPlusApiUrl.ConfirmOrders, body).catch((e) => {
      throw new EsmPlusCommerceConfirmOrdersError(e);
    });
  }

  public async resetGrid() {
    await this.axios.post(EsmPlusApiUrl.ResetGrid, new EsmPlusCommerceResetGridParam()).catch((e) => {
      throw new EsmPlusCommerceResetGridError(e);
    });
  }

  public async downloadExcelFile(condition: EsmPlusCommerceDateCondition) {
    const response = await this.axios
      .post(EsmPlusApiUrl.DownloadExcel, new EsmPlusCommerceDownloadExcelFileParam(this.target, this.searchAccount, condition))
      .catch((e) => {
        throw new EsmPlusCommerceDownloadExcelFileError(e);
      });

    return Buffer.from(response.data);
  }
}
