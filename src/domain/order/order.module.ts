import { QueueName } from '@common';
import { ThirdPartyModule } from '@module';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderProcessor } from './order.processor';
import { OrderService } from './order.service';

@Module({
  imports: [forwardRef(() => ThirdPartyModule), BullModule.registerQueue({ name: QueueName.Collect }), HttpModule],
  controllers: [OrderController],
  providers: [OrderService, OrderProcessor],
})
export class OrderModule {}
