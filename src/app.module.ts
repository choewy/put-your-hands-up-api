import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigFactoryModule } from './common';
import { ContextModule, LoggerModule } from './core';

@Module({
  imports: [ConfigFactoryModule.forRoot(), ContextModule.forRoot(), LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
