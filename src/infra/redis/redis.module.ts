import { RedisConfigService } from '@core';
import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createClient } from 'redis';

import { REDIS_CLIENT_TOKEN } from './constants';

@Module({})
export class RedisModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: RedisModule,
      imports: [
        BullModule.forRootAsync({
          inject: [RedisConfigService],
          useFactory(config: RedisConfigService) {
            return config.redisOptions;
          },
        }),
      ],
      providers: [this.redisClientProvider],
      exports: [this.redisClientProvider],
    };
  }

  private static get redisClientProvider(): Provider {
    return {
      inject: [RedisConfigService],
      provide: REDIS_CLIENT_TOKEN,
      async useFactory(config: RedisConfigService) {
        const redisClient = createClient(config.redisOptions);
        await redisClient.connect();

        return redisClient;
      },
    };
  }
}
