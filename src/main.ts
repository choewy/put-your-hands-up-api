import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ContextInterceptor } from './common/context/context.interceptor';
import { ExceptionFilter } from './common/providers/exception.filter';
import { SerializeInterceptor } from './common/providers/serialize.interceptor';
import { ValidationPipe } from './common/providers/validation.pipe';
import { Swagger } from './common/swagger/swagger';
import { ConfigKey } from './constant/enums';
import { isLocal } from './constant/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  const origin = new RegExp(configService.getOrThrow(ConfigKey.CorsOrigin));
  const port = configService.getOrThrow(ConfigKey.Port);
  const host = configService.getOrThrow(ConfigKey.Host);

  if (isLocal()) {
    new Swagger(app).setDocument().setup();
  }

  app.enableShutdownHooks();
  app.enableCors({ origin });
  app.useGlobalInterceptors(new SerializeInterceptor(app.get(Reflector)), app.get(ContextInterceptor));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(port, host);
}

bootstrap();
