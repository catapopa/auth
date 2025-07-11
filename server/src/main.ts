import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadConfig } from './config/app.config';

async function bootstrap() {
  try {
    const config = loadConfig();
    const app = await NestFactory.create(AppModule);

    // Enable CORS with configuration
    app.enableCors({
      origin: config.cors.origins,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      optionsSuccessStatus: 200,
    });

    // Enable validation pipes
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      })
    );

    // Swagger API Documentation
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Auth API')
      .setDescription('User Authentication and Management API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(config.port, config.host);
    console.log(
      `Application is running on: http://${config.host}:${config.port}`
    );
    console.log(`Environment: ${config.env}`);
    console.log(
      `API Documentation available at: http://${config.host}:${config.port}/api/docs`
    );
  } catch (error) {
    console.error('Application failed to start:', error);
    process.exit(1);
  }
}

void bootstrap();
