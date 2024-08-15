import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EsmPlusService } from './esm-plus.service';

@Module({
  imports: [HttpModule],
  providers: [EsmPlusService],
  exports: [EsmPlusService],
})
export class EsmPlusModule {}
