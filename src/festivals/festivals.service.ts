import { HttpService } from '@nestjs/axios/dist';
import {  Injectable, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AddNewFestivalsDto, EditFestivalsDto } from './dto/festivals.dto';
import { IFestivals, IFestivalsResponse, IHosts } from './model/festivals.model';

@Injectable()
export class FestivalsService {

    festivals: IFestivals[] = [];
    hosts: IHosts[] = [];

    constructor(private readonly httpService: HttpService) {
        this.onInit();
    }

     onInit(): void {
        // return this.httpService.get('Festivals.json')
        // return this.httpService.get('https://jsonplaceholder.typicode.com/users/1')
        // .pipe(
        //     map(response => response.data)
        // );
        const data : IFestivalsResponse = {
            "festivals": [
                {
                    "id": 1,
                    "name": "The Beer Festival",
                    "hostId": 5,
                    "startDate": "2025-01-23T00:00:00",
                    "endDate": "2025-01-28T00:00:00",
                    "isSuitableForChildren": false
                },
                {
                    "id": 2,
                    "name": "The Fun Festival",
                    "hostId": 4,
                    "startDate": "2025-02-05T00:00:00",
                    "endDate": "2025-02-10T00:00:00",
                    "isSuitableForChildren": true
                },
                {
                    "id": 3,
                    "name": "The Food Festival",
                    "hostId": 3,
                    "startDate": "2025-02-18T00:00:00",
                    "endDate": "2025-02-25T00:00:00",
                    "isSuitableForChildren": true
                },
                {
                    "id": 4,
                    "name": "The VR Festival",
                    "hostId": 2,
                    "startDate": "2025-03-04T00:00:00",
                    "endDate": "2025-03-08T00:00:00",
                    "isSuitableForChildren": false
                },
                {
                    "id": 5,
                    "name": "The Gaming Festival",
                    "hostId": 1,
                    "startDate": "2025-04-12T00:00:00",
                    "endDate": "2025-04-28T00:00:00",
                    "isSuitableForChildren": true
                }
            ],
            "hosts": [
                {
                    "id": 1,
                    "name": "Yaron Cohen"
                },
                {
                    "id": 2,
                    "name": "Nachman Roash"
                },
                {
                    "id": 3,
                    "name": "Eli Levin"
                },
                {
                    "id": 4,
                    "name": "David Nitay"
                },
                {
                    "id": 5,
                    "name": "Aviv Biron"
                }
            ]
        }

        this.festivals = data.festivals;
        this.hosts = data.hosts;

    }

    getFestivalsList() : IFestivals[] {
       return this.festivals;
    }

    getHostsList() : IHosts[] {
       return this.hosts;
    }

    addFestival(newFestivals: AddNewFestivalsDto) : IFestivals[] {
        newFestivals.id = Date.now();
        this.festivals.push(newFestivals);
        return this.festivals;
    }

    editFestival(id:string, editFestivals: EditFestivalsDto) : IFestivals[] {
        this.festivals = this.festivals.map(festival => {
            if(festival.id === +id){
                console.log({...festival, ...editFestivals})
                return {...festival, ...editFestivals}
            }
            return festival;
        })
        return this.festivals;
    }

    deleteFestival(id:string) : IFestivals[] {
        return this.festivals = this.festivals.filter(festival => festival.id !== +id)
    }

}