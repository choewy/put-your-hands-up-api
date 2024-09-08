import { Module } from '@nestjs/common';

import { EsmPlusModule } from './esm-plus';
import { InvoiceModule } from './invoice';
import { NaverModule } from '../module';

@Module({
  imports: [EsmPlusModule, NaverModule, InvoiceModule],
})
export class DomainModule {}
