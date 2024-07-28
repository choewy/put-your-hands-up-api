import { ThirdPartyModule } from '@module';
import { forwardRef, Module } from '@nestjs/common';

import { TransferController } from './transfer.controller';

@Module({
  imports: [forwardRef(() => ThirdPartyModule)],
  controllers: [TransferController],
  providers: [],
})
export class TransferModule {}
