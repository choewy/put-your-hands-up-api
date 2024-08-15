export class EsmPlusLoginFailedError extends Error {
  constructor(message?: string) {
    super();

    this.name = EsmPlusLoginFailedError.name;
    this.message = message ?? '';
  }
}
