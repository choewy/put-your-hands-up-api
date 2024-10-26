import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ExceptionFilter, SerializeInterceptor, Swagger, SwaggerDocumentOptions, ValidationPipe } from './bootstrap';
import { AppConfigFactory, isLocal } from './common';
import { ContextInterceptor } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfigFactory = app.get(AppConfigFactory);
  const packageProfile = appConfigFactory.packageProfile;

  if (isLocal()) {
    const swaggerOptions: SwaggerDocumentOptions = {
      title: packageProfile.name,
      version: packageProfile.version,
    };

    Swagger.setup(app, swaggerOptions);
  }

  const corsOptions = appConfigFactory.corsOptions;
  const { port, host } = appConfigFactory.listenOptions;

  app.enableShutdownHooks();
  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new SerializeInterceptor(app.get(Reflector)), app.get(ContextInterceptor));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(port, host);
}

bootstrap();
