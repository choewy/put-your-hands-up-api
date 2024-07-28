export class ErrorLog {
  context?: string;
  handler?: string;
  name?: string;
  message?: string;
  stack?: string;

  constructor(e: unknown, context?: string, handler?: string) {
    const error = e as Error;

    this.context = context;
    this.handler = handler;
    this.name = error?.name;
    this.message = error?.message;
    this.stack = error?.stack;
  }
}
