import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import * as fs from 'fs';

async function bootstrap() {
  const looger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const options = new DocumentBuilder()
    .setTitle('SMARTHOME-CHBAN API Document')
    .setDescription('The Smart Home Backend API Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFile('swagger.json', JSON.stringify(document), (err) => {
    // if (err) {
    //   return logger.error(err);
    // }
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.HPPT_PORT, () => {
    looger.verbose(`Server is running on port : ${process.env.HPPT_PORT}`);
  });
}
bootstrap();
