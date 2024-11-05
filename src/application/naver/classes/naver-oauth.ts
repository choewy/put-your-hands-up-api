import { DateTime } from 'luxon';

import { NaverOAuthCredentials, NaverOAuthTokenResponse } from '../constant/interfaces';

export class NaverOAuth {
  credentials: NaverOAuthCredentials;
  accessToken: string;
  expiredAt: DateTime;

  constructor(credentials: NaverOAuthCredentials, data: NaverOAuthTokenResponse) {
    this.credentials = credentials;
    this.accessToken = data.access_token;
    this.expiredAt = DateTime.local().plus({ seconds: data.expires_in });
  }

  get authorization() {
    return `Bearer ${this.accessToken}`;
  }

  set(oauth: NaverOAuth) {
    this.credentials = oauth.credentials;
    this.accessToken = oauth.accessToken;
    this.expiredAt = oauth.expiredAt;
  }

  isExpired() {
    return this.expiredAt.diffNow('milliseconds').get('milliseconds') < 0;
  }
}
