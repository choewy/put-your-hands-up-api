import { Module } from '@nestjs/common';

import { CollectModule } from './collect';
import { TransferModule } from './transfer';
import { ThirdPartyModule } from '../module/third-party';

@Module({
  imports: [ThirdPartyModule, CollectModule, TransferModule],
})
export class DomainModule {}
