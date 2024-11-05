import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ContextPropertyKey } from './enums';

@Injectable()
export class ContextService {
  constructor(private readonly clsService: ClsService) {}

  getRequestID() {
    return this.clsService.get(ContextPropertyKey.RequestId);
  }

  getExecutionContext(): ExecutionContext {
    return this.clsService.get(ContextPropertyKey.ExecutionContext) ?? null;
  }

  setExecutionContext(executionContext: ExecutionContext) {
    this.clsService.set(ContextPropertyKey.ExecutionContext, executionContext);
  }
}
