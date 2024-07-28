import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { RequestContextKey } from './constants';

@Injectable()
export class RequestContextService {
  constructor(private readonly clsService: ClsService) {}

  public getRequestID() {
    return this.clsService.get(RequestContextKey.RequestID) ?? null;
  }

  public setConext(context: ExecutionContext) {
    this.clsService.set(
      RequestContextKey.Context,
      [
        typeof context.getClass === 'function' ? context.getClass()?.name : '',
        typeof context.getHandler === 'function' ? context.getHandler()?.name : '',
      ].join('.'),
    );
  }

  public getContext() {
    return this.clsService.get(RequestContextKey.Context) ?? null;
  }
}
