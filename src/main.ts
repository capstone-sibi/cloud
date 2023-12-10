import { NestFactory, Reflector  } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Capstone Bangkit SIBI Translator API')
    .setDescription('This is the SIBI Translator API')
    .setVersion('1.0')
    .addTag('sibi-translator')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
