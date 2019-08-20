import { IsEmail, MaxLength, Length, IsNumber ,IsDate} from 'class-validator';
import { NOMEM } from 'dns';
import { isNumber } from 'util';

export class DebtorDto{

    @IsEmail()
    @MaxLength(200)
    de_description:string;

    @IsNumber()
    fk_id_person:number;

    @IsNumber()
    values: number;
    
    // @IsDate()
    // lastname: DataCue;
}