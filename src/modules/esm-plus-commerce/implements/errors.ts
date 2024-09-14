import { HttpError, ServiceError } from '@common';
import { AxiosError } from 'axios';

export class EsmPlusCommerceLoginFailedError extends ServiceError {
  constructor(message?: string) {
    super(message);

    this.name = EsmPlusCommerceLoginFailedError.name;
  }
}

export class EsmPlusCommerceSearchNewOrdersError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusCommerceSearchNewOrdersError.name;
  }
}

export class EsmPlusCommerceSearchNewOrdersEmptyArrayError extends ServiceError {
  constructor(cause?: unknown) {
    super('empty response data array', cause);

    this.name = EsmPlusCommerceSearchNewOrdersEmptyArrayError.name;
  }
}

export class EsmPlusCommerceConfirmOrdersError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusCommerceConfirmOrdersError.name;
  }
}

export class EsmPlusCommerceResetGridError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusCommerceResetGridError.name;
  }
}

export class EsmPlusCommerceDownloadExcelFileError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusCommerceDownloadExcelFileError.name;
  }
}
