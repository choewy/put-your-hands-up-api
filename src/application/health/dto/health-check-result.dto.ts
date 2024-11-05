import { ApiResponseProperty } from '@nestjs/swagger';
import { HealthCheckResult } from '@nestjs/terminus';

import { HealthCheckDetailDTO } from './health-check-detail.dto';
import { HealthCheckTarget } from '../constant/enums';

export class HealthCheckResultDTO implements Record<HealthCheckTarget, HealthCheckDetailDTO> {
  @ApiResponseProperty({ type: HealthCheckDetailDTO })
  MemoryHeap: HealthCheckDetailDTO;

  @ApiResponseProperty({ type: HealthCheckDetailDTO })
  MemoryRSS: HealthCheckDetailDTO;

  @ApiResponseProperty({ type: HealthCheckDetailDTO })
  Disk: HealthCheckDetailDTO;

  constructor(healthCheckResult: HealthCheckResult) {
    console.log(healthCheckResult);
    const details = healthCheckResult.details;

    for (const target of Object.keys(healthCheckResult.details)) {
      this[target] = details[target];
    }
  }
}
