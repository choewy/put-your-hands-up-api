import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { RedisQueueCallback } from './interfaces';

export const RedisQueueResultDTOBuilder = <CallbackData, CallbackPayload = object>(
  CallbackDataType: Type<CallbackData>,
  CallbackPayloadType?: Type<CallbackPayload>,
) => {
  class RedisQueueResultDTO implements RedisQueueCallback<CallbackPayload, CallbackData> {
    @ApiResponseProperty({ type: Boolean })
    result: boolean;

    @ApiResponseProperty({ type: [CallbackDataType] })
    data: CallbackData[];

    @ApiResponseProperty({ type: CallbackPayloadType ?? Object })
    payload: CallbackPayload | null;

    @ApiResponseProperty({ type: Object })
    error: unknown;

    constructor(args?: Partial<RedisQueueCallback<CallbackPayload, CallbackData>>) {
      this.result = args?.result ?? false;
      this.data = args?.data ?? null;
      this.payload = args?.payload ?? null;
      this.error = args?.error ?? null;
    }
  }

  return RedisQueueResultDTO;
};
