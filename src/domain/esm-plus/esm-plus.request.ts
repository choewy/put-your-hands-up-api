import { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { EsmPlusApiUrl, EsmPlusTarget } from './constants';
import { EsmPlusConditionDTO } from './dtos';
import {
  EsmPlusConfirmOrderParam,
  EsmPlusConfirmOrdersError,
  EsmPlusDownloadExcelFileError,
  EsmPlusDownloadExcelFileParam,
  EsmPlusResetGridError,
  EsmPlusResetGridParam,
  EsmPlusSearchAccount,
  EsmPlusSearchNewOrdersEmptyArrayError,
  EsmPlusSearchNewOrdersError,
  EsmPlusSearchNewOrdersResponse,
  EsmPlusSearchOrderParam,
} from './implements';

export class EsmPlusRequest {
  private readonly searchAccount = new EsmPlusSearchAccount();

  constructor(
    private readonly target: EsmPlusTarget,
    private readonly request: AxiosInstance,
  ) {}

  async getSearchAccount() {
    const { data } = await this.request.get(EsmPlusApiUrl.GetId);

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

  async searchNewOrdersAndConfirmOrders(condition: EsmPlusConditionDTO, confirmExecution: boolean) {
    while (true) {
      const orderKeys = await this.searchNewOrders(condition);

      if (orderKeys.length === 0 || confirmExecution === false) {
        break;
      }

      await this.confirmOrders(orderKeys);
    }
  }

  private async searchNewOrders(condition: EsmPlusConditionDTO) {
    const body = new EsmPlusSearchOrderParam(this.target, this.searchAccount, condition);
    const response = await this.request.post<EsmPlusSearchNewOrdersResponse>(EsmPlusApiUrl.SearchNewOrders, body).catch((e) => {
      throw new EsmPlusSearchNewOrdersError(e);
    });

    const orderKeys = new Map<string, string>();

    if (Array.isArray(response?.data?.data) === false) {
      throw new EsmPlusSearchNewOrdersEmptyArrayError(response?.data?.data);
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
    const body = new EsmPlusConfirmOrderParam(this.searchAccount, orderKeys);
    await this.request.post(EsmPlusApiUrl.ConfirmOrders, body).catch((e) => {
      throw new EsmPlusConfirmOrdersError(e);
    });
  }

  public async resetGrid() {
    await this.request.post(EsmPlusApiUrl.ResetGrid, new EsmPlusResetGridParam()).catch((e) => {
      throw new EsmPlusResetGridError(e);
    });
  }

  public async downloadExcelFile(condition: EsmPlusConditionDTO) {
    const response = await this.request
      .post(EsmPlusApiUrl.DownloadExcel, new EsmPlusDownloadExcelFileParam(this.target, this.searchAccount, condition))
      .catch((e) => {
        throw new EsmPlusDownloadExcelFileError(e);
      });

    return Buffer.from(response.data);
  }
}
