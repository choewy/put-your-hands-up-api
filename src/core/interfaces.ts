import { ExecutionContext } from '@nestjs/common';

export interface TroublesomeDatabaseLoggerContextService {
  getRequestId(): string;
  getExecutionContext(): ExecutionContext;
}
