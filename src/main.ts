import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(8001);
  console.log(`Server api running!`);
}

bootstrap();
