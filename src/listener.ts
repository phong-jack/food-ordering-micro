import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, RmqOptions } from '@nestjs/microservices';

async function bootstrap() {
  const options: RmqOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URI],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
      noAck: true, // No sign = loop queue
    },
  };

  const app = await NestFactory.createMicroservice(AppModule, options);

  await app.listen();

  console.log(`Microservice running!`);
}

bootstrap();
