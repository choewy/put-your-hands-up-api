import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { TroublesomeDatabaseLogger, TroublesomeDatabaseLoggerRequestContextService } from './core';
import * as entities from './entities';

export const createTroublesomeEntityOptions = <T extends TroublesomeDatabaseLoggerRequestContextService>(
  options: Omit<MysqlConnectionOptions, 'type' | 'entities' | 'namingStrategy' | 'synchronize' | 'dropSchema'>,
  requestContextService?: T,
): TypeOrmModuleOptions => {
  return {
    ...options,
    type: 'mariadb',
    namingStrategy: new SnakeNamingStrategy(),
    entities: Object.values(entities),
    synchronize: false,
    dropSchema: false,
    logger: new TroublesomeDatabaseLogger(new Logger(), options.logging ?? ['info', 'error', 'warn'], requestContextService),
  };
};
