import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { EsmPlusCommerceTarget, EsmPlusLoginTabIndex } from './constants';
import { EsmPlusCommerceBrowser } from './esm-plus-commerce.browser';
import { EsmPlusCommerceRequest } from './esm-plus-commerce.request';
import { EsmPlusCommerceCredentials, EsmPlusCommerceDateCondition } from './implements';

@Injectable()
export class EsmPlusCommerceService {
  async collectOrders(target: EsmPlusCommerceTarget, credentials: EsmPlusCommerceCredentials, condition: EsmPlusCommerceDateCondition) {
    const axios = await this.loginAndCreateAxios(target, credentials);

    const request = new EsmPlusCommerceRequest(target, axios);
    await request.getSearchAccount();
    await request.searchNewOrdersAndConfirmOrders(condition, false);
    await request.resetGrid();

    const buffer = await request.downloadExcelFile(condition);
    const orders = await this.parseOrdersExcelFile(buffer);

    return orders;
  }

  async transferInvoices(target: EsmPlusCommerceTarget, credentials: EsmPlusCommerceCredentials) {
    const axios = await this.loginAndCreateAxios(target, credentials);

    console.log(axios);

    return null;
  }

  private getTabIndexByTarget(target: EsmPlusCommerceTarget) {
    switch (target) {
      case EsmPlusCommerceTarget.Master:
        return EsmPlusLoginTabIndex.Master;

      case EsmPlusCommerceTarget.Gmarket:
        return EsmPlusLoginTabIndex.Gmarket;

      case EsmPlusCommerceTarget.Auction:
        return EsmPlusLoginTabIndex.Auction;
    }
  }

  private async loginAndCreateAxios(target: EsmPlusCommerceTarget, credentials: EsmPlusCommerceCredentials): Promise<AxiosInstance | null> {
    const browser = new EsmPlusCommerceBrowser();

    try {
      await browser.create(true);
      await browser.clickTab(this.getTabIndexByTarget(target));
      await browser.inputAccount(credentials.account);
      await browser.inputPassword(credentials.password);
      await browser.submitForm();
      await browser.waitFor(10);

      const cookies = await browser.getCookies();
      const request = await browser.createRequest(cookies);

      return request;
    } catch (e) {
      throw e;
    } finally {
      await browser.close();
    }
  }

  private async parseOrdersExcelFile(buffer: Buffer) {
    console.log(buffer);
    return [];
  }
}
