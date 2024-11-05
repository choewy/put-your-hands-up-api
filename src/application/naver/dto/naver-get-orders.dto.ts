import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { DateTime } from 'luxon';

import { NaverOAuthCredentialsDTO } from './naver-oauth-credentials.dto';
import { NaverLastChangedType } from '../constant/enums';

import { ToDateTime } from '@/constant/transformers';
import { IsDateTime } from '@/constant/validators';

export class NaverGetOrdersDTO extends NaverOAuthCredentialsDTO {
  @ApiProperty({ type: Date, format: 'date' })
  @IsDateTime()
  @IsNotEmpty()
  @ToDateTime()
  startDate: DateTime;

  @ApiProperty({ type: Date, format: 'date' })
  @IsDateTime()
  @IsNotEmpty()
  @ToDateTime()
  endDate: DateTime;

  @ApiProperty({ type: [String], enum: NaverLastChangedType })
  @IsArray()
  @IsEnum(NaverLastChangedType, { each: true })
  @IsNotEmpty()
  lastChangedTypes: NaverLastChangedType[];
}
