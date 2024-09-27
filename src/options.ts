import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as entities from './entities';

export const createTroublesomeEntityOptions = (
  options: Omit<MysqlConnectionOptions, 'type' | 'entities' | 'namingStrategy' | 'synchronize' | 'dropSchema'>,
): TypeOrmModuleOptions => {
  return {
    ...options,
    type: 'mariadb',
    namingStrategy: new SnakeNamingStrategy(),
    entities: Object.values(entities),
    synchronize: false,
    dropSchema: false,
  };
};
