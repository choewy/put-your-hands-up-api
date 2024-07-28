import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('전송')
@Controller('transfer')
export class TransferController {}
