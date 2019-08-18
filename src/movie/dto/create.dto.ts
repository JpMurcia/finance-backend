import { IsInt, IsNotEmpty, Length, IsPositive, IsNumber } from 'class-validator';

export class CreateDto {

    @Length(5, 100)
    name: string;
    
    @IsNotEmpty()
    @Length(10, 255)
    url: string;
}