import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, Delete } from '@nestjs/common';
import { apiBaseRoutes, apiUriRoutes } from 'src/app.const';
import { AddNewFestivalsDto, EditFestivalsDto } from './dto/festivals.dto';
import { FestivalsService } from './festivals.service';
import { IFestivals, IHosts } from './model/festivals.model';

@Controller(`${apiBaseRoutes.base}`)
export class FestivalsController {

    constructor(private readonly festivalsService: FestivalsService) {}

    @Get(`${apiUriRoutes.festivals}`)
     getAllfestivals(): IFestivals[] {
        return this.festivalsService.getFestivalsList();
    }

    @Post(`${apiUriRoutes.festivals}`)
    addNewFestival(@Body() newFestival : AddNewFestivalsDto): IFestivals[] {
        return this.festivalsService.addFestival(newFestival);
    }

    @Put(`${apiUriRoutes.festivals}/:id`)
    editFestival(@Param('id') festivalsId: string, @Body() newFestival : EditFestivalsDto): IFestivals[] {
        return this.festivalsService.editFestival(festivalsId , newFestival);
    }

    @Delete(`${apiUriRoutes.festivals}/:id`)
    deleteFestival(@Param('id') festivalsId: string): IFestivals[] {
        return this.festivalsService.deleteFestival(festivalsId);
    }

    @Get(`${apiUriRoutes.hosts}`)
     getAllHosts(): IHosts[] {
        return this.festivalsService.getHostsList();
    }

}
