import { Module } from '@nestjs/common';

import { InvoiceModule } from './invoice';
import { OrderModule } from './order';
import { ThirdPartyModule } from '../module';

@Module({
  imports: [ThirdPartyModule, OrderModule, InvoiceModule],
})
export class DomainModule {}
