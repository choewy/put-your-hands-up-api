import { AppConfigService, ServerConfigService, Swagger } from '@core';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);
  const serverConfigService = app.get(ServerConfigService);

  if (appConfigService.isProduction === false) {
    Swagger.setup(app, {
      title: appConfigService.name,
      version: appConfigService.version,
      server: { url: serverConfigService.httpUrl },
    });
  }

  app.enableCors(serverConfigService.corsOptions);

  await app.listen(serverConfigService.port, serverConfigService.host);
}
bootstrap();
