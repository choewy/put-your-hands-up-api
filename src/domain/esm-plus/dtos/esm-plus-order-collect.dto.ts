import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInstance, IsNotEmpty } from 'class-validator';

import { EsmPlusCallbackDTO } from './esm-plus-callback.dto';
import { EsmPlusConditionDTO } from './esm-plus-condition.dto';
import { EsmPlusCredentialsDTO } from './esm-plus-credentials.dto';
import { EsmPlusTarget } from '../constants';

export class EsmPlusOrderCollectDTO {
  @ApiProperty({ type: String, enum: EsmPlusTarget })
  @IsNotEmpty()
  @IsEnum(EsmPlusTarget)
  target: EsmPlusTarget;

  @ApiProperty({ type: EsmPlusCredentialsDTO })
  @IsNotEmpty()
  @IsInstance(EsmPlusCredentialsDTO)
  credentials: EsmPlusCredentialsDTO;

  @ApiProperty({ type: EsmPlusConditionDTO })
  @IsNotEmpty()
  @IsInstance(EsmPlusConditionDTO)
  condition: EsmPlusConditionDTO;

  @ApiProperty({ type: EsmPlusCallbackDTO })
  @IsNotEmpty()
  @IsInstance(EsmPlusCallbackDTO)
  callback: EsmPlusCallbackDTO;
}
