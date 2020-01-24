import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('MOCK API')
    .setDescription('Mock API to communicate with React App')
    .setSchemes('http', 'https')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API is waiting for REQ's on port: ${port}`);
}
bootstrap();
