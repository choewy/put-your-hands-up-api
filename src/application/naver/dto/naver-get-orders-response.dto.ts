import { ApiProperty } from '@nestjs/swagger';

import { NaverConfirmDTO } from './naver-confirm.dto';
import { NaverLastChangedStatusDTO } from './naver-last-changed-status.dto';

export class NaverGetOrdersResponseDTO {
  @ApiProperty({ type: [NaverLastChangedStatusDTO] })
  lastChangedStatuses: NaverLastChangedStatusDTO[];

  @ApiProperty({ type: [NaverConfirmDTO] })
  confirmResults: NaverConfirmDTO[];

  constructor(lastChangedStatuses: NaverLastChangedStatusDTO[], confirmResults: NaverConfirmDTO[]) {
    this.lastChangedStatuses = lastChangedStatuses;
    this.confirmResults = confirmResults;
  }
}
