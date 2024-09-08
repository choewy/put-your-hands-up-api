import { ApiProperty } from '@nestjs/swagger';

export class RegistCompleteDTO {
  @ApiProperty({ type: String })
  requestId: string;

  constructor(requestId: string) {
    this.requestId = requestId;
  }
}
