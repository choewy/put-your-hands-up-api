import { ConfigurationModule, GloablSerializeInterceptor, GlobalExceptionFilter, GlobalValidationPipe, RequestContextModule } from '@core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigurationModule.forRoot(), RequestContextModule.forRoot()],
  controllers: [AppController],
  providers: [GloablSerializeInterceptor, GlobalValidationPipe, GlobalExceptionFilter, AppService],
})
export class AppModule {}
