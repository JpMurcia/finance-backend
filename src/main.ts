import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get('ConfigService').envConfig;
  
  app.setGlobalPrefix(configService.APP_URL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.APP_PORT || '4200');

  console.log(`Server running on ${configService.APP_HOST_SERVER}:${configService.APP_PORT || '4200'}/${configService.APP_URL_PREFIX}`);
}
bootstrap();
