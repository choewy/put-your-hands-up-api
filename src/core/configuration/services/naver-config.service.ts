import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NaverApiCredentials } from '../constants';

@Injectable()
export class NaverConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get credentials(): NaverApiCredentials {
    return {
      clientId: this.configService.getOrThrow('NAVER_API_CLIENT_ID'),
      clientSecret: this.configService.getOrThrow('NAVER_API_CLIENT_SECRET'),
    };
  }

  public get apiUrl() {
    return this.configService.getOrThrow('NAVER_API_URL');
  }
}
