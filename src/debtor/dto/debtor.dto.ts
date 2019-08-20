import { IsEmail, MaxLength, Length, IsNumber ,IsDate, IsBooleanString} from 'class-validator';
import { NOMEM } from 'dns';
import { isNumber } from 'util';
import { person } from '../../../entities/person';

export class DebtorDto{

    @IsEmail()
    @MaxLength(200)
    de_description:string;

    @IsNumber()
    fk_id_person:person;

    @IsNumber()
    values: number;
    
    // @IsBooleanString()
    // de_state:string;
    //  @MaxLength(200)
    //  Date: string;
}