import { CollectOrderDTO } from '@common';
import { EsmPlusTarget } from '@module';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CollectEsmPlusOrderDTO extends CollectOrderDTO {
  @ApiProperty({ type: String, enum: EsmPlusTarget })
  @IsNotEmpty()
  @IsEnum(EsmPlusTarget)
  target: EsmPlusTarget;
}
