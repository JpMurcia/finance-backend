import { Injectable } from '@nestjs/common';

import { person } from '../../entities/person';
import { debtor } from '../../entities/debtor';
import { user1 } from '../../entities/user1';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorDto } from './dto/debtor.dto';
@Injectable()
export class DebtorService {


    constructor(
        @InjectRepository(person) private readonly personRepository: Repository<person>,
        @InjectRepository(user1) private readonly userRepository: Repository<user1>,
        @InjectRepository(debtor) private readonly debtorRepository: Repository<debtor>
    ) { }

   async getHello(){

    return await this.debtorRepository.find();
   }

    async GetAllDebtor(UserId){
      //  let debtor;
       // return await this.debtorRepository.find();
        return await this.debtorRepository
        .createQueryBuilder("debtor")
        .where("debtor.fkIdPerson= :fk_id_persona", { fk_id_persona: UserId } )
              
         .execute();
    /* */
     
      }


      async CreateDebtort(debtor: DebtorDto){
        let response;
            try {
                await getManager().transaction(async entityManager => {
                    const Personaux = await entityManager.save(
                        this.personRepository.create({
                        }));
    
                    const newDebtor = await entityManager.save(
                        this.debtorRepository.create({
                         
                            "de_description": debtor.de_description,
                           
                            "fkIdPerson": { id_person: Personaux.id_person },
                            "values_debtor": debtor.values
                        }));
    
                   
    
                    response = { "code": "3", "message": `Éxito: ${newDebtor.id_debtor}` };
                });
            } catch (error) {
                response = { "code": "1", "message": `Error: ${error}` };
            } finally {
                return response;
            }
     
      }

      
    // async createUser(user: UserDto) {
    //  
    // }
     
}
