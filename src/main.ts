import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { printApiDomainUrl } from './app.helpers';
import { ValidationPipe } from '@nestjs/common';

process.env.TZ = 'UTC'; // set node time zone

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT') || 3333;
 
  const corsOptions = {
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: configService.get<string>('APP_ALLOW_ORIGIN') || '*',
  };
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors(corsOptions);
  await app.listen(port, () => printApiDomainUrl(port));
}
bootstrap();
