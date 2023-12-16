import { NestFactory, Reflector  } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CH2-PS407 SIBI Translator API')
    .setDescription('This is the SIBI Translator API from CH2-PS407.')
    .setVersion('1.0')
    .addTag('api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
