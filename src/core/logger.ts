import { Logger as NestLogger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { LogLevel, Logger as TypeOrmLoggerInterface, LoggerOptions as TypeOrmLoggerOptions } from 'typeorm';

import { TroublesomeDatabaseLoggerContextService } from './interfaces';

export class TroublesomeDatabaseLogger implements TypeOrmLoggerInterface {
  constructor(
    private readonly logger: NestLogger,
    private readonly options: TypeOrmLoggerOptions,
    private readonly contextService?: TroublesomeDatabaseLoggerContextService,
  ) {}

  private getContext() {
    if (this.contextService == null) {
      return undefined;
    }

    const context = {
      requestId: this.contextService.getRequestId() ?? undefined,
      className: undefined,
      handler: undefined,
    };

    const executionContext = this.contextService.getExecutionContext();

    if (executionContext) {
      context.className = executionContext.getClass()?.name ?? undefined;
      context.handler = executionContext.getHandler()?.name ?? undefined;
    }

    return context;
  }

  private canLogging(level: LogLevel) {
    if (this.options === 'all') {
      return true;
    }

    if (this.options === true) {
      return true;
    }

    if (this.options instanceof Array && this.options.indexOf(level) > -1) {
      return true;
    }

    return false;
  }

  private extractContextAndQuery(originQuery: string, parameters?: unknown[]) {
    const start = '/* ';
    const startIndex = originQuery.indexOf(start);

    const end = ' */ ';
    const endIndex = originQuery.indexOf(end);

    let comment = undefined;
    let query = originQuery;

    if (startIndex > -1 && endIndex > -1) {
      comment = originQuery.slice(startIndex + start.length, endIndex);
      query = originQuery.slice(endIndex + end.length);
    }

    return {
      ...this.getContext(),
      comment,
      query,
      parameters,
    };
  }

  logQuery(query: string, parameters?: unknown[]) {
    if (this.canLogging('info')) {
      this.logger.debug({
        level: 'info',
        ...this.extractContextAndQuery(query, parameters),
        executedAt: DateTime.local().toSQL(),
      });
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: unknown[]) {
    if (this.canLogging('error')) {
      this.logger.error({
        level: 'error',
        ...this.extractContextAndQuery(query, parameters),
        executedAt: DateTime.local().toSQL(),
        error,
      });
    }
  }

  logQuerySlow(latency: number, query: string, parameters?: unknown[]) {
    if (this.canLogging('warn')) {
      this.logger.warn({
        level: 'warn',
        ...this.extractContextAndQuery(query, parameters),
        executedAt: DateTime.local().toSQL(),
        latency,
      });
    }
  }

  logSchemaBuild(message: string) {
    if (this.canLogging('schema')) {
      this.logger.log(message);
    }
  }

  logMigration(message: string) {
    if (this.canLogging('migration')) {
      this.logger.log(message);
    }
  }

  log(level: 'log' | 'info' | 'warn', message: unknown) {
    switch (level) {
      case 'log':
        if (this.canLogging('log')) {
          this.logger.log(message);
        }

        break;

      case 'warn':
        if (this.canLogging('warn')) {
          this.logger.warn(message);
        }

        break;
    }
  }
}
