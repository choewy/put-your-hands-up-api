import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CallbackDTO {
  @ApiProperty({ type: String, description: 'callback URL' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiPropertyOptional({ type: Object, description: '결과 전송 시 함께 받을 값' })
  @IsOptional()
  @IsObject()
  payload?: object;
}
