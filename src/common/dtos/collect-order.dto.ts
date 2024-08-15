import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty } from 'class-validator';

import { CallbackDTO } from './callback.dto';
import { CredentialsDTO } from './credentials.dto';
import { DateConditionDTO } from './date-condition.dto';

export class CollectOrderDTO {
  @ApiProperty({ type: CredentialsDTO })
  @IsNotEmpty()
  @IsInstance(CredentialsDTO)
  credentials: CredentialsDTO;

  @ApiProperty({ type: DateConditionDTO })
  @IsNotEmpty()
  @IsInstance(DateConditionDTO)
  condition: DateConditionDTO;

  @ApiProperty({ type: CallbackDTO })
  @IsNotEmpty()
  @IsInstance(CallbackDTO)
  callback: CallbackDTO;
}
