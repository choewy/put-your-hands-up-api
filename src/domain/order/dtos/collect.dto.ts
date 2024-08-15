import { CallbackDTO, CredentialsDTO, DateConditionDTO, TargetName } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInstance, IsNotEmpty } from 'class-validator';

export class CollectDTO {
  @ApiProperty({ type: String, enum: TargetName })
  @IsNotEmpty()
  @IsEnum(TargetName)
  target: TargetName;

  @ApiProperty({ type: CredentialsDTO })
  @IsNotEmpty()
  @IsInstance(CredentialsDTO)
  credentials: CredentialsDTO;

  @ApiProperty({ type: DateConditionDTO })
  @IsNotEmpty()
  @IsInstance(DateConditionDTO)
  condition: DateConditionDTO;

  @ApiProperty({ type: CallbackDTO })
  @IsNotEmpty()
  @IsInstance(CallbackDTO)
  callback: CallbackDTO;
}
