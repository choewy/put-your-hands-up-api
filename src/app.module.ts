import {
  ConfigurationModule,
  GloablSerializeInterceptor,
  GlobalExceptionFilter,
  GlobalValidationPipe,
  LoggerModule,
  RequestContextModule,
} from '@core';
import { RedisModule } from '@infra';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigurationModule.forRoot(), LoggerModule.forRoot(), RequestContextModule.forRoot(), RedisModule.forRoot()],
  controllers: [AppController],
  providers: [GloablSerializeInterceptor, GlobalValidationPipe, GlobalExceptionFilter, AppService],
})
export class AppModule {}
