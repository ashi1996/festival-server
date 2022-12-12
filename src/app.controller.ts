import { Controller, Get } from '@nestjs/common';
import { apiBaseRoutes } from './app.const';
import { AppService } from './app.service';

@Controller(`${apiBaseRoutes.test}`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}