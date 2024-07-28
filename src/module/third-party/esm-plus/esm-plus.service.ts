import { CredentialsDTO, DateConditionDTO, TargetName, ThirdPartyServiceImpl } from '@common';
import { AppConfigService, ErrorLog } from '@core';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { EsmPlusLoginPage, EsmPlusOrderRequest } from './implements';

@Injectable()
export class EsmPlusService implements ThirdPartyServiceImpl {
  constructor(private readonly appConfigService: AppConfigService) {}

  async collectOrders(target: TargetName, credentials: CredentialsDTO, condition: DateConditionDTO) {
    const axios = await this.login(credentials);

    const request = new EsmPlusOrderRequest(target, credentials, axios);
    await request.getSearchAccount();
    await request.searchNewOrdersAndConfirmOrders(condition);
    // TODO reset grid
    // TODO download excel
    // TODO parse excel to JSON
    // TODO send to api server

    return null;
  }

  // TODO implement
  async transferInvoices<T = any>(target: TargetName, credentials: CredentialsDTO): Promise<T> {
    const axios = await this.login(credentials);

    console.log(axios);

    return null;
  }

  private async login(credentials: CredentialsDTO): Promise<AxiosInstance | null> {
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
      Logger.error(new ErrorLog(e, EsmPlusService.name, this.login.name));
      throw e;
    } finally {
      await loginPage.close();
    }
  }
}
