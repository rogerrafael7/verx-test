import { NestFactory } from '@nestjs/core';
import { envs } from '@/envs';
import { ValidationPipe } from '@nestjs/common';
import { ApplicationModule } from '@/application/application.module';
import { ExceptionFilter } from '@/infra/common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(envs.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
