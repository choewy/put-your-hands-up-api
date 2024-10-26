import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { NaverModule } from './naver';

@Module({
  imports: [HealthModule, NaverModule],
})
export class ApplicationModule {}
