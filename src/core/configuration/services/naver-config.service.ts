import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NaverConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get apiUrl() {
    return this.configService.getOrThrow('NAVER_API_URL');
  }
}
