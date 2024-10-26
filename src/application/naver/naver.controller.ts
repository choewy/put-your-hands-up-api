import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NaverGetNaversOrdersDTO, NaverOAuthCredentialsDTO, NaverOAuthDTO } from './dtos';
import { NaverService } from './naver.service';

@ApiTags('네이버 API')
@Controller('naver')
export class NaverController {
  constructor(private readonly naverService: NaverService) {}

  @Post('oauth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'OAuth2.0' })
  @ApiOkResponse({ type: NaverOAuthDTO })
  async getOAuth(@Body() body: NaverOAuthCredentialsDTO) {
    return this.naverService.getOAuth(body);
  }

  @Post('orders')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '주문 조회' })
  @ApiOkResponse({})
  async getNaverOrders(@Body() body: NaverGetNaversOrdersDTO) {
    return this.naverService.getNaverOrders(body);
  }
}
