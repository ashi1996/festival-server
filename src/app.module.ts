import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from './all-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagerMiddleware } from './app.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
  ],
  controllers: [AppController],
  providers: [
    AllExceptionsFilter,
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(LoggerMiddleware).forRoutes('*')
      consumer.apply(PagerMiddleware).forRoutes({path: '*', method: RequestMethod.GET})
  }
}
