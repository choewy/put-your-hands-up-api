import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class EsmPlusConditionDTO {
  @ApiProperty({ type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ type: String, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
