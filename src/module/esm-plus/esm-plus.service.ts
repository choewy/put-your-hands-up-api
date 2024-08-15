import { CredentialsDTO, DateConditionDTO } from '@common';
import { AppConfigService, ErrorLog } from '@core';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { EsmPlusTarget } from './constants';
import { EsmPlusLoginPage, EsmPlusOrderRequest } from './implements';

@Injectable()
export class EsmPlusService {
  constructor(private readonly appConfigService: AppConfigService) {}

  async collectOrders(target: EsmPlusTarget, credentials: CredentialsDTO, condition: DateConditionDTO) {
    const axios = await this.loginAndCreateAxios(credentials);
    const request = new EsmPlusOrderRequest(target, axios);
    await request.getSearchAccount();
    await request.searchNewOrdersAndConfirmOrders(condition, this.appConfigService.isProduction);
    await request.resetGrid();

    const buffer = await request.downloadExcelFile(condition);
    const orders = await this.parseOrdersExcelFile(buffer);

    return orders;
  }

  // TODO implement
  async transferInvoices<T = any>(target: EsmPlusTarget, credentials: CredentialsDTO): Promise<T> {
    const axios = await this.loginAndCreateAxios(credentials);

    console.log(axios);

    return null;
  }

  private async loginAndCreateAxios(credentials: CredentialsDTO): Promise<AxiosInstance | null> {
    const loginPage = new EsmPlusLoginPage();

    try {
      await loginPage.create(this.appConfigService.isLocal);
      await loginPage.clickTab(credentials.type);
      await loginPage.inputAccount(credentials.account);
      await loginPage.inputPassword(credentials.password);
      await loginPage.submitForm();
      await loginPage.waitFor(10);

      const cookies = await loginPage.getCookies();
      const request = await loginPage.createRequest(cookies);

      return request;
    } catch (e) {
      Logger.error(new ErrorLog(e, EsmPlusService.name, this.loginAndCreateAxios.name));
      throw e;
    } finally {
      await loginPage.close();
    }
  }

  // TODO
  private async parseOrdersExcelFile(buffer: Buffer) {
    console.log(buffer);
    return [];
  }
}
