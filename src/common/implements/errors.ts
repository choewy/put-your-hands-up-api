import { AxiosError } from 'axios';

export class HttpError extends Error {
  readonly status: number;
  readonly cause: unknown;

  constructor(e: AxiosError) {
    super();

    this.status = e.response?.status ?? -1;
    this.cause = e.response?.data ?? {
      name: e.name,
      code: e.code,
      message: e.message,
    };
  }
}

export class ServiceError extends Error {
  readonly cause: unknown;

  constructor(message: string, cause?: unknown) {
    super();

    this.message = message;
    this.cause = cause ?? null;
  }
}
