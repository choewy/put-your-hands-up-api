import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './application/health/health.module';
import { NaverModule } from './application/naver/naver.module';
import { ContextModule } from './common/context/context.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContextModule, LoggerModule, HealthModule, NaverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
