import { NaverApiCredentials } from '@core';
import { AxiosError, AxiosHeaders } from 'axios';
import * as bcrypt from 'bcrypt';

export class NaverGetTokenHeader extends AxiosHeaders {
  constructor(credentials: NaverApiCredentials) {
    super({});

    const basicToken = Buffer.from([credentials.clientId, credentials.clientSecret].join(':')).toString('base64');

    this.set('Content-Type', 'application/x-www-form-urlencoded');
    this.set('Authorization', `Basic ${basicToken}`);
  }
}

export class NaverGetTokenRequestBody {
  readonly type = 'SELLER';
  readonly grant_type = 'client_credentials';
  readonly timestamp = Date.now();
  readonly client_secret_sign!: string;
  readonly client_id!: string;
  readonly account_id!: string;

  constructor(accountId: string, credentials: NaverApiCredentials) {
    const sign = [credentials.clientId, this.timestamp].join('_');
    const hashed = bcrypt.hashSync(sign, credentials.clientSecret);

    this.client_secret_sign = Buffer.from(hashed, 'binary').toString('base64');
    this.client_id = credentials.clientId;
    this.account_id = accountId;
  }
}

export class NaverGetTokenError extends Error {
  constructor(e?: AxiosError | Error) {
    super();

    this.name = NaverGetTokenError.name;

    switch (true) {
      case e instanceof AxiosError:
        this.message = e.response?.data?.message ?? e.message;
        break;

      case e instanceof Error:
        this.message = e.message;
        break;
    }
  }
}
