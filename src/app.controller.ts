import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @HealthCheck()
  check() {
    return this.appService.getHealth();
  }
}
