import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL || 'amqp://127.0.0.1:5672'],
        queue: process.env.RMQ_QUEUE || 'moderate',
      },
    },
  );
  app.enableShutdownHooks();

  await app.listen();
  logger.log(`Moderation service is listening`);
}
bootstrap();
