export interface RedisQueueCallback<CallbackPayload, CallbackData> {
  result: boolean;
  payload: CallbackPayload | null;
  data: CallbackData | null;
  error: unknown;
}
