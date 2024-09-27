import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createTroublesomeEntityOptions } from './options';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const options = createTroublesomeEntityOptions({
          host: configService.getOrThrow('DB_HOST'),
          port: +configService.getOrThrow('DB_PORT'),
          username: configService.getOrThrow('DB_USERNAME'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_DATABASE'),
        });

        return { ...options, synchronize: true, dropSchema: true, logging: true };
      },
    }),
  ],
})
class BootstrapModule {}

async function bootstrap() {
  const app = await NestFactory.create(BootstrapModule, { bufferLogs: true });
  await app.listen(3001);
}

bootstrap();
