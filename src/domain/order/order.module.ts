import { EsmPlusModule, NaverModule } from '@module';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';

import { OrderQueueName } from './constants';
import { OrderController } from './order.controller';
import { OrderProcessor } from './order.processor';
import { OrderService } from './order.service';

@Module({
  imports: [forwardRef(() => EsmPlusModule), forwardRef(() => NaverModule), BullModule.registerQueue({ name: OrderQueueName }), HttpModule],
  controllers: [OrderController],
  providers: [OrderService, OrderProcessor],
})
export class OrderModule {}
