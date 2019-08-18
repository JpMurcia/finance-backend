import { Length, IsEmail } from 'class-validator';

export class LoginDto {

    @IsEmail() 
    email: string;
    
    @Length(4, 30) 
    password: string;
}