import { DateConditionDTO } from '@common';
import { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { EsmPlusConfirmOrderParam } from './esm-plus-confirm-order-param';
import { EsmPlusDownloadExcelFileParam } from './esm-plus-download-order-excel-file-param';
import { EsmPlusResetGridParam } from './esm-plus-reset-grid-param';
import { EsmPlusSearchAccount } from './esm-plus-search-account';
import { EsmPlusSearchOrderParam } from './esm-plus-search-orders-param';
import { EsmPlusSearchNewOrdersResponse } from './interfaces';
import { EsmPlusApiUrl, EsmPlusTarget } from '../constants';

export class EsmPlusOrderRequest {
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

  async searchNewOrdersAndConfirmOrders(condition: DateConditionDTO, confirmExecution: boolean) {
    while (true) {
      const orderKeys = await this.searchNewOrders(condition);

      if (orderKeys.length === 0 || confirmExecution === false) {
        break;
      }

      await this.confirmOrders(orderKeys);
    }
  }

  private async searchNewOrders(condition: DateConditionDTO) {
    const body = new EsmPlusSearchOrderParam(this.target, this.searchAccount, condition);
    const response = await this.request.post<EsmPlusSearchNewOrdersResponse>(EsmPlusApiUrl.SearchNewOrders, body).catch((e) => {
      console.log(e.response?.data);
      throw new Error('TODO - Axios Error');
    });

    const orderKeys = new Map<string, string>();

    if (Array.isArray(response?.data?.data) === false) {
      throw new Error('TODO - Custom Error');
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
      console.log(e.response?.data);
      throw new Error('TODO - Axios Error');
    });
  }

  public async resetGrid() {
    await this.request.post(EsmPlusApiUrl.ResetGrid, new EsmPlusResetGridParam()).catch((e) => {
      console.log(e.response?.data);
      throw new Error('TODO - Axios Error');
    });
  }

  public async downloadExcelFile(condition: DateConditionDTO) {
    const response = await this.request
      .post(EsmPlusApiUrl.DownloadExcel, new EsmPlusDownloadExcelFileParam(this.target, this.searchAccount, condition))
      .catch((e) => {
        console.log(e.response?.data);
        throw new Error('TODO - Axios Error');
      });

    return Buffer.from(response.data);
  }
}
