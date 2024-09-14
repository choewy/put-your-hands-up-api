import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EsmPlusCommerceService } from './esm-plus-commerce.service';

@Module({
  imports: [HttpModule],
  providers: [EsmPlusCommerceService],
  exports: [EsmPlusCommerceService],
})
export class EsmPlusCommerceModule {}
