import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { NaverController } from './naver.controller';
import { NaverService } from './naver.service';

@Module({
  imports: [HttpModule],
  controllers: [NaverController],
  providers: [NaverService],
})
export class NaverModule {}
