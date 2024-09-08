import { Module } from '@nestjs/common';

import { EsmPlusModule } from './esm-plus';
import { NaverModule } from './naver';

@Module({
  imports: [EsmPlusModule, NaverModule],
})
export class DomainModule {}
