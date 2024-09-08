import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { EsmPlusQueueName } from './constants';
import { EsmPlusQueueService } from './esm-plus-queue.service';
import { EsmPlusController } from './esm-plus.controller';
import { EsmPlusProcessor } from './esm-plus.processor';
import { EsmPlusService } from './esm-plus.service';

@Module({
  imports: [BullModule.registerQueue({ name: EsmPlusQueueName.Bull }), HttpModule],
  controllers: [EsmPlusController],
  providers: [EsmPlusService, EsmPlusQueueService, EsmPlusProcessor],
})
export class EsmPlusModule {}
