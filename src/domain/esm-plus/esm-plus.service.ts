import { AppConfigService } from '@core';
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { EsmPlusTarget } from './constants';
import { EsmPlusCredentialsDTO, EsmPlusOrderCollectDTO } from './dtos';
import { EsmPlusBrowser } from './esm-plus.browser';
import { EsmPlusRequest } from './esm-plus.request';

@Injectable()
export class EsmPlusService {
  constructor(private readonly appConfigService: AppConfigService) {}

  async collectOrders({ credentials, target, condition }: EsmPlusOrderCollectDTO) {
    const axios = await this.loginAndCreateAxios(credentials);

    const request = new EsmPlusRequest(target, axios);
    await request.getSearchAccount();
    await request.searchNewOrdersAndConfirmOrders(condition, this.appConfigService.isProduction);
    await request.resetGrid();

    const buffer = await request.downloadExcelFile(condition);
    const orders = await this.parseOrdersExcelFile(buffer);

    return orders;
  }

  async transferInvoices(target: EsmPlusTarget, credentials: EsmPlusCredentialsDTO) {
    const axios = await this.loginAndCreateAxios(credentials);

    console.log(axios);

    return null;
  }

  private async loginAndCreateAxios(credentials: EsmPlusCredentialsDTO): Promise<AxiosInstance | null> {
    const browser = new EsmPlusBrowser();

    try {
      await browser.create(this.appConfigService.isLocal);
      await browser.clickTab(credentials.type);
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

  // TODO
  private async parseOrdersExcelFile(buffer: Buffer) {
    console.log(buffer);
    return [];
  }
}
