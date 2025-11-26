import { DomainExceptionFilter } from '@/@shared/domain/exception/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });


  app.useGlobalFilters(new DomainExceptionFilter());

  const port = process.env.BACKEND_PORT;

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
