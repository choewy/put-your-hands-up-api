import { ExecutionContext } from '@nestjs/common';

export interface TroublesomeDatabaseLoggerRequestContextService {
  getRequestId(): string;
  getExecutionContext(): ExecutionContext;
}
