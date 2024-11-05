import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NaverGetOrdersResponseDTO } from './dto/naver-get-orders-response.dto';
import { NaverGetOrdersDTO } from './dto/naver-get-orders.dto';
import { NaverOAuthCredentialsDTO } from './dto/naver-oauth-credentials.dto';
import { NaverOAuthDTO } from './dto/naver-oauth.dto';
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
  @ApiOkResponse({ type: NaverGetOrdersResponseDTO })
  async getOrders(@Body() body: NaverGetOrdersDTO) {
    return this.naverService.getOrders(body);
  }
}
