import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { EsmPlusQueueName } from './constants';
import { EsmPlusQueueProcessor } from './esm-plus-queue.processor';
import { EsmPlusQueueService } from './esm-plus-queue.service';
import { EsmPlusController } from './esm-plus.controller';
import { EsmPlusService } from './esm-plus.service';

@Module({
  imports: [BullModule.registerQueue({ name: EsmPlusQueueName.Bull }), HttpModule],
  controllers: [EsmPlusController],
  providers: [EsmPlusService, EsmPlusQueueService, EsmPlusQueueProcessor],
})
export class EsmPlusModule {}
