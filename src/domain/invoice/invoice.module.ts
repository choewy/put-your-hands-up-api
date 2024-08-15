import { ThirdPartyModule } from '@module';
import { forwardRef, Module } from '@nestjs/common';

import { InvoiceController } from './invoice.controller';

@Module({
  imports: [forwardRef(() => ThirdPartyModule)],
  controllers: [InvoiceController],
  providers: [],
})
export class InvoiceModule {}
