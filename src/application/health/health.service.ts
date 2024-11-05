import { Injectable } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheckService, MemoryHealthIndicator, HealthCheckError } from '@nestjs/terminus';

import { HealthCheckTarget } from './constant/enums';
import { HealthCheckResultDTO } from './dto/health-check-result.dto';

@Injectable()
export class HealthService {
  constructor(
    private healthCheckService: HealthCheckService,
    private diskHealthIndicator: DiskHealthIndicator,
    private memoryIndicator: MemoryHealthIndicator,
  ) {}

  async healthCheck() {
    const healthCheckResult = await this.healthCheckService.check([
      () => this.memoryIndicator.checkHeap(HealthCheckTarget.MemoryHeap, 150 * 1024 * 1024).catch(this.healthCheckErrorCatch(HealthCheckTarget.MemoryHeap)),
      () => this.memoryIndicator.checkRSS(HealthCheckTarget.MemoryRSS, 150 * 1024 * 1024).catch(this.healthCheckErrorCatch(HealthCheckTarget.MemoryRSS)),
      () =>
        this.diskHealthIndicator
          .checkStorage(HealthCheckTarget.Disk, { path: '/', threshold: 250 * 1024 * 1024 * 1024 })
          .catch(this.healthCheckErrorCatch(HealthCheckTarget.Disk)),
    ]);

    return new HealthCheckResultDTO(healthCheckResult);
  }

  private healthCheckErrorCatch(target: string) {
    return (e: unknown) => {
      const error = e as HealthCheckError;

      return { [target]: error.cause[target] };
    };
  }
}
