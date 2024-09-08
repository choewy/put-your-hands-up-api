import { RedisQueueResultDTOBuilder } from '@infra';

import { EsmPlusOrderDTO } from './esm-plus-order.dto';

export class EsmPlusOrderCollectCallbackDTO extends RedisQueueResultDTOBuilder(EsmPlusOrderDTO) {}
