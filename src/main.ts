import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({})
class BootstrapModule {}

async function bootstrap() {
  const app = await NestFactory.create(BootstrapModule, { bufferLogs: true });
  await app.listen(3001);
}

bootstrap();
