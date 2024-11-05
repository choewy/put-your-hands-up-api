import { Logger, Provider } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';

export const winstonLoggerProvider: Provider = {
  provide: WinstonLogger,
  inject: [WINSTON_MODULE_NEST_PROVIDER],
  useFactory(winstonLogger: WinstonLogger) {
    return Logger.overrideLogger(winstonLogger);
  },
};
