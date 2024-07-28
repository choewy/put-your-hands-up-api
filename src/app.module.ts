import { ConfigurationModule, GloablSerializeInterceptor, GlobalExceptionFilter, GlobalValidationPipe } from '@core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigurationModule.forRoot()],
  controllers: [AppController],
  providers: [GloablSerializeInterceptor, GlobalValidationPipe, GlobalExceptionFilter, AppService],
})
export class AppModule {}
