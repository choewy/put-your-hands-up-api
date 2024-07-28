import { Module } from '@nestjs/common';

import { TransferController } from './transfer.controller';

@Module({
  imports: [],
  controllers: [TransferController],
  providers: [],
})
export class TransferModule {}
