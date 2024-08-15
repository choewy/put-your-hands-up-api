import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CollectDTO } from './dtos';
import { OrderService } from './order.service';

@ApiTags('수집')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  @ApiOperation({ summary: '주문 수집 Queue 등록' })
  @ApiCreatedResponse()
  async registCollectOrders(@Body() body: CollectDTO) {
    return this.orderService.registCollectOrders(body);
  }
}
