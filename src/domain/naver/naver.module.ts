import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { NaverQueueName } from './constants';
import { NaverQueueProcessor } from './naver-queue.processor';
import { NaverQueueService } from './naver-queue.service';
import { NaverController } from './naver.controller';
import { NaverService } from './naver.service';

@Module({
  imports: [BullModule.registerQueue({ name: NaverQueueName.Bull }), HttpModule],
  controllers: [NaverController],
  providers: [NaverService, NaverQueueService, NaverQueueProcessor],
})
export class NaverModule {}
