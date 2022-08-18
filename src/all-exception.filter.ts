
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiResponseModel } from './api.model';
  import { HttpAdapterHost } from '@nestjs/core';
// import { AppLoggerService } from './app-logger/app-logger.service';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: any, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      const response = new ApiResponseModel();
      response.statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      response.innerCode = exception?.response?.code || 0;
      if (exception.hasOwnProperty('response')) {
        response.displayMessage = exception?.response?.message;
      } else {
        response.displayMessage = response.statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : exception.message.error || exception.message || exception.name || null;
      }
      response.exception = response.statusCode === HttpStatus.UNAUTHORIZED ? response.displayMessage : process.env.ENV_NAME === 'PRODUCTION' ? 'Stack trace disabled for production' : exception?.stack;
      response.isSuccessful = false;
      response.data = null;
      // this.appLogger.error(response,request,exception.stack);
      httpAdapter.reply(ctx.getResponse(), response, httpStatus);
    }
  }
  