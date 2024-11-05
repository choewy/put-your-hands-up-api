import { ApiResponseProperty } from '@nestjs/swagger';
import { HealthIndicatorResult, HealthIndicatorStatus } from '@nestjs/terminus';

import { HealthCheckTarget } from '../constant/enums';

export class HealthCheckDetailDTO {
  @ApiResponseProperty({ type: String, enum: ['up', 'down'] as HealthIndicatorStatus[] })
  status: HealthIndicatorStatus;

  constructor(key: HealthCheckTarget, healthIndicatorResult: HealthIndicatorResult) {
    this.status = healthIndicatorResult[key]?.status;
  }
}
