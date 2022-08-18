import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiBaseRoutes, bearerAuthConfig, tokenScheme } from './app.const';
import { apiResponseSchemes, printApiDomainUrl } from './app.helpers';
import { ApiResponseGeneric, ApiResponsePrimitives } from './api.model';


process.env.TZ = 'UTC'; // set node time zone

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT') || 3333;
  const globalPrefix = configService.get<string>('APP_GLOBAL_PREFIX');
  const envName = configService.get<string>('ENV_NAME') || 'DEVELOPMENT';
  const corsOptions = {
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: configService.get<string>('APP_ALLOW_ORIGIN') || '*',
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useGlobalFilters(await app.resolve(AllExceptionsFilter));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new ResponseInterceptor(app.get(AppLoggerService)));
  // app.useLogger(app.get(AppLoggerService));
  const options = new DocumentBuilder() // swagger
  .setTitle(`${configService.get<string>('SWAGGER_TITLE')} - ${envName}`)
  .setDescription(configService.get<string>('SWAGGER_DESCRIPTION'))
  .addBearerAuth(bearerAuthConfig, tokenScheme)
  .setVersion(`${envName} ${configService.get<string>('VERSION')}`)
  .build();
  const document = SwaggerModule.createDocument(app, options, {extraModels: [ApiResponseGeneric, 
                                                                             ApiResponsePrimitives, 
                                                                             ...apiResponseSchemes]});
  SwaggerModule.setup(apiBaseRoutes.base, app, document, {swaggerOptions: {tagsSorter: 'alpha', operationsSorter: 'method'}});

  await app.listen(port, () => printApiDomainUrl(port,globalPrefix));
}
bootstrap();
