import { NaverModule } from '@module';
import { forwardRef, Module } from '@nestjs/common';

import { InvoiceController } from './invoice.controller';

@Module({
  imports: [forwardRef(() => NaverModule)],
  controllers: [InvoiceController],
  providers: [],
})
export class InvoiceModule {}
