import { HttpError, ServiceError } from '@common';

export class RedisQueueError extends Error {
  private error: HttpError & ServiceError;

  constructor(error: unknown) {
    super();

    this.error = error as HttpError & ServiceError;
  }

  public toFailedError() {
    const e = new Error();

    e.name = this.error.name;
    e.message = JSON.stringify(this.toResponse());
    e.stack = this.error.stack;

    return e;
  }

  public toResponse() {
    return {
      name: this.error.name,
      message: this.error.message,
      cause: this.error.cause,
      status: this.error.status,
    };
  }
}
