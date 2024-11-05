import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { NaverOAuthCredentials } from '../constant/interfaces';

export class NaverOAuthCredentialsDTO implements NaverOAuthCredentials {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  clientSecret: string;
}
