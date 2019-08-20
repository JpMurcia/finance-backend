import { IsEmail, MaxLength, Length } from 'class-validator';

export class UserDto{

    @IsEmail()
    @MaxLength(50)
    email:string;

    @Length(8, 50)
    password:string;

    @Length(2, 30)
    firstname: string;
    
    @Length(2, 30)
    lastname: string;

}