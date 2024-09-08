import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EsmPlusCredentialsDTO {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  type: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  account: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  apiKey?: string;
}
