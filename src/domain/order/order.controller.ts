import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CollectEsmPlusOrderDTO } from './dtos';
import { OrderService } from './order.service';

@ApiTags('수집')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('esm-plus')
  @ApiOperation({ summary: 'ESM Plus 주문 수집 Queue 등록' })
  @ApiCreatedResponse()
  async registerCollectEsmPlusOrder(@Body() body: CollectEsmPlusOrderDTO) {
    return this.orderService.registCollectOrders(body);
  }
}
