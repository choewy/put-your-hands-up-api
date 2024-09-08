import { AxiosHeaders } from 'axios';
import * as bcrypt from 'bcrypt';

import { NaverCredentialsDTO } from '../dtos';

export class NaverGetTokenHeader extends AxiosHeaders {
  constructor(credentials: NaverCredentialsDTO) {
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
  readonly account_id!: string;
  readonly client_id!: string;
  readonly client_secret_sign!: string;

  constructor(credentials: NaverCredentialsDTO) {
    const sign = [credentials.clientId, this.timestamp].join('_');
    const hashed = bcrypt.hashSync(sign, credentials.clientSecret);

    this.account_id = credentials.account;
    this.client_id = credentials.clientId;
    this.client_secret_sign = Buffer.from(hashed, 'binary').toString('base64');
  }
}
