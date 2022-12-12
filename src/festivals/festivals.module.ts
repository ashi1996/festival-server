import { Module } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { FestivalsController } from './festivals.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    FestivalsService,
  ],
  exports: [FestivalsService],
  controllers: [FestivalsController]
})
export class FestivalsModule {}
