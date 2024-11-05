import { AxiosError } from 'axios';

import { NaverErrorResponse } from './interfaces';

export class NaverResponseError extends Error {
  constructor(e: AxiosError<NaverErrorResponse>) {
    super(e.response?.data?.message);

    this.name = NaverResponseError.name;
    this.cause = e.response?.data;
  }
}

export class NaverOAuthTokenError extends Error {
  constructor(e: AxiosError) {
    super();

    this.name = NaverOAuthTokenError.name;
    this.cause = e.response?.data;
  }
}

export class NaverLastChangedStatusesError extends Error {
  constructor(e: AxiosError) {
    super();

    this.name = NaverLastChangedStatusesError.name;
    this.cause = e.response?.data;
  }
}

export class NaverConfirmError extends Error {
  constructor(e: AxiosError) {
    super();

    this.name = NaverConfirmError.name;
    this.cause = e.response?.data;
  }
}
