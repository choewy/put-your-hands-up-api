import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientOptions } from 'redis';

@Injectable()
export class RedisConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get redisOptions(): RedisClientOptions {
    return {
      url: this.configService.getOrThrow('REDIS_URL'),
      username: this.configService.get('REDIS_USERNAME'),
      password: this.configService.get('REDIS_PASSWORD'),
      database: +(this.configService.getOrThrow('REDIS_DATABASE') ?? 0),
    };
  }
}
