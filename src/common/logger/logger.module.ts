import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { LoggerMiddleware } from './logger.middleware';
import { winstonLoggerProvider } from './logger.provider';

import { isLocal } from '@/constant/helpers';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      level: isLocal() ? 'debug' : 'warn',
      handleExceptions: true,
      handleRejections: true,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(process.env.npm_package_name, {
              appName: true,
              processId: true,
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      ],
    }),
  ],
  providers: [winstonLoggerProvider, LoggerMiddleware],
  exports: [winstonLoggerProvider],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
