import { HttpError, ServiceError } from '@common';
import { AxiosError } from 'axios';

export class EsmPlusLoginFailedError extends ServiceError {
  constructor(message?: string) {
    super(message);

    this.name = EsmPlusLoginFailedError.name;
  }
}

export class EsmPlusSearchNewOrdersError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusSearchNewOrdersError.name;
  }
}

export class EsmPlusSearchNewOrdersEmptyArrayError extends ServiceError {
  constructor(cause?: unknown) {
    super('empty response data array', cause);

    this.name = EsmPlusSearchNewOrdersEmptyArrayError.name;
  }
}

export class EsmPlusConfirmOrdersError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusConfirmOrdersError.name;
  }
}

export class EsmPlusResetGridError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusResetGridError.name;
  }
}

export class EsmPlusDownloadExcelFileError extends HttpError {
  constructor(e: AxiosError) {
    super(e);

    this.name = EsmPlusDownloadExcelFileError.name;
  }
}
