import { Module } from '@nestjs/common';

import { CollectController } from './collect.controller';

@Module({
  imports: [],
  controllers: [CollectController],
  providers: [],
})
export class CollectModule {}
