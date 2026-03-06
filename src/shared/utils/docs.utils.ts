import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class DocumentationUtil {
  config(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Namu Test Node Backend - Leonardo Mortari')
      .setVersion('1.0')
      .setDescription('Namu Test Node Backend API description')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }
}
