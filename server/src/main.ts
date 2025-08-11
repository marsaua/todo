import './polyfills';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(express.json());
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://todo-ki18.vercel.app',
      'https://todo-ki18-git-main-marsauas-projects.vercel.app',
      'https://todo-ki18-2sjbokhzb-marsauas-projects.vercel.app',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //Swagger configuration

  const config = new DocumentBuilder()
    .setTitle('NestJS - Project to study')
    .setDescription('Use the base API URL as http://localhost:4000')
    .setTermsOfService('http://localhost:4000/terms-of-service')
    .setLicense('MIT License', 'http://localhost:4000/license')
    .addServer('http://localhost:4000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
