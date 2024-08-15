import { Module } from '@nestjs/common';

import { InvoiceModule } from './invoice';
import { OrderModule } from './order';
import { EsmPlusModule, NaverModule } from '../module';

@Module({
  imports: [EsmPlusModule, NaverModule, OrderModule, InvoiceModule],
})
export class DomainModule {}
