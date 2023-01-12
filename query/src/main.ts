import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://127.0.0.1:5672'],
      queue: process.env.RMQ_POSTS_QUEUE || 'events',
    },
  });

  await app.startAllMicroservices();
  const port = process.env.PORT || 3002;
  await app.listen(port);
  logger.log(`Query service is running on port ${port}`);
}
bootstrap();
