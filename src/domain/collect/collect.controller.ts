import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('수집')
@Controller('collect')
export class CollectController {}
