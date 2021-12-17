import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ItemModule } from './item/item.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Shopping List API > Item')
    .setDescription('My Shopping List API Description.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {include: [ItemModule]});
  SwaggerModule.setup('api/item', app, document);
  await app.listen(3000);
}
bootstrap();
