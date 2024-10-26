import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { NaverOAuthCredentials } from '../classes';

export class NaverOAuthCredentialsDTO extends NaverOAuthCredentials {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  declare accountId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  declare clientId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  declare clientSecret: string;
}
