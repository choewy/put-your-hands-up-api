import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CollectService } from './collect.service';
import { CollectDTO } from './dtos';

@ApiTags('수집')
@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Post('orders')
  @ApiOperation({ summary: '주문 수집 Queue 등록' })
  @ApiCreatedResponse()
  async registCollectOrders(@Body() body: CollectDTO) {
    return this.collectService.registCollectOrders(body);
  }
}
