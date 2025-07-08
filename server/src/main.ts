import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3003',
    credentials: true,
  });
  //Swagger configuration

  const config = new DocumentBuilder()
    .setTitle('NestJS - Project to study')
    .setDescription('Use the base API URL as http://localhost:3004')
    .setTermsOfService('http://localhost:3004/terms-of-service')
    .setLicense('MIT License', 'http://localhost:3004/license')
    .addServer('http://localhost:3004')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
