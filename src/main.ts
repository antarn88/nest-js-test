import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configuration from './configuration';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Users CRUD')
    .setDescription('The description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/api-docs', app, document);

  await app.listen(configuration().port);
}
bootstrap();
