import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend and Swagger
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://auth-production-32b4.up.railway.app',
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('User Authentication and Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = parseInt(process.env.PORT || '3000');
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `API Documentation available at: http://localhost:${port}/api/docs`,
  );
}

void bootstrap();
