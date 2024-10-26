import { ApiProperty } from '@nestjs/swagger';

import { NaverOAuth } from '../classes';

export class NaverOAuthDTO {
  @ApiProperty({ type: String })
  accessToken: string;

  @ApiProperty({ type: Date })
  expiredAt: Date;

  @ApiProperty({ type: Boolean })
  expired: boolean;

  constructor(oauth: NaverOAuth) {
    this.accessToken = oauth.accessToken;
    this.expiredAt = oauth.expiredAt.toJSDate();
    this.expired = oauth.isExpired();
  }
}
