import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { DateTime } from 'luxon';

import { NaverOAuthCredentialsDTO } from './naver-oauth-credentials.dto';
import { NaverLastChangedType } from '../constants';

import { IsDateTime, toDateTime } from '@/common';

export class NaverGetOrdersDTO extends NaverOAuthCredentialsDTO {
  @ApiProperty({ type: Date, format: 'date' })
  @IsDateTime()
  @IsNotEmpty()
  @Transform(({ value }) => toDateTime(value))
  startDate: DateTime;

  @ApiProperty({ type: Date, format: 'date' })
  @IsDateTime()
  @IsNotEmpty()
  @Transform(({ value }) => toDateTime(value))
  endDate: DateTime;

  @ApiProperty({ type: [String], enum: NaverLastChangedType })
  @IsArray()
  @IsEnum(NaverLastChangedType, { each: true })
  @IsNotEmpty()
  lastChangedTypes: NaverLastChangedType[];
}
