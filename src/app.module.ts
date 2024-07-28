import { ConfigurationModule } from '@core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigurationModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
