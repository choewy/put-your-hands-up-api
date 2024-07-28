import { Module } from '@nestjs/common';

import { CollectModule } from './collect';
import { TransferModule } from './transfer';

@Module({
  imports: [CollectModule, TransferModule],
})
export class DomainModule {}
