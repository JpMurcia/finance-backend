import { IsEmail, MaxLength, Length, IsNumber } from 'class-validator';

export class MovementDto{

    @IsNumber()
    value: number;

    @Length(4, 150)
    description:string;

    @Length(2, 30)
    firstname: string;
    
    @Length(2, 30)
    lastname: string;

}