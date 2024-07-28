import { Module } from '@nestjs/common';

import { EsmPlusModule } from './esm-plus';

const modules = [EsmPlusModule];

@Module({
  imports: modules,
  exports: modules,
})
export class ThirdPartyModule {}
