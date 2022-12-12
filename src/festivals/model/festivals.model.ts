export interface IFestivalsResponse {
    festivals: IFestivals[] ;
    hosts: IHosts[];
}

export interface IFestivals {
    id:  number,
    name: string,
    hostId: number,
    startDate: string,
    endDate: string,
    isSuitableForChildren: boolean
}

export interface IHosts {
    id: number,
    name: string
}


