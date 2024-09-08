import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NaverCredentialsDTO {
  @ApiProperty({ type: String, description: 'Mall 번호' })
  @IsNotEmpty()
  @IsString()
  mallId: string;

  @ApiProperty({ type: String, description: 'Naver 몰 계정' })
  @IsNotEmpty()
  @IsString()
  account: string;

  @ApiProperty({ type: String, description: 'Naver API Client ID' })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({ type: String, description: 'Naver API Client Secret' })
  @IsNotEmpty()
  @IsString()
  clientSecret: string;
}
