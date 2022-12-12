import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class AddNewFestivalsDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    name: string;
    @ApiProperty({required: true})
    @IsNotEmpty()
    hostId: number;
    @ApiProperty({required: true})
    @IsNotEmpty()
    startDate: string;
    @ApiProperty({required: true})
    @IsNotEmpty()
    endDate: string;
    @ApiProperty({required: true})
    @IsNotEmpty()
    isSuitableForChildren: boolean;
    @IsOptional()
    id: number;
}

export class EditFestivalsDto {
    @ApiProperty({required: false})
    @IsNotEmpty()
    name: string;
    @ApiProperty({required: false})
    @IsNotEmpty()
    hostId: number;
    @ApiProperty({required: false})
    @IsNotEmpty()
    startDate: string;
    @ApiProperty({required: false})
    @IsNotEmpty()
    endDate: string;
    @ApiProperty({required: false})
    @IsNotEmpty()
    isSuitableForChildren: boolean;
}