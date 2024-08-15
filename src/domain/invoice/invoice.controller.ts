import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('송장')
@Controller('invoice')
export class InvoiceController {}
