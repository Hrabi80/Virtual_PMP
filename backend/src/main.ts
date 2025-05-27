import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Virtual PMP app')
    .setDescription('API documentation for NestJs virtual PMP application.')
    .setVersion('1.0')
    .addTag('projectManagement')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  /*
  const seed = await NestFactory.create(SeedModule);
  const seedService = seed.get(SeedService);
  await seedService.run();
  await seed.close(); 
  */
  await app.listen(3000);
}
bootstrap();
