import { QueueName } from '@common';
import { ThirdPartyModule } from '@module';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';

import { CollectController } from './collect.controller';
import { CollectProcessor } from './collect.processor';
import { CollectService } from './collect.service';

@Module({
  imports: [forwardRef(() => ThirdPartyModule), BullModule.registerQueue({ name: QueueName.Collect }), HttpModule],
  controllers: [CollectController],
  providers: [CollectService, CollectProcessor],
})
export class CollectModule {}
