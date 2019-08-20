import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { user1 } from '../../entities/user1';
import { person } from '../../entities/person';
import { account } from '../../entities/account';


import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(person) private readonly personRepository: Repository<person>,
        @InjectRepository(user1) private readonly userRepository: Repository<user1>,
        @InjectRepository(account) private readonly accountRepository: Repository<account>

    ) { }

     async createUser(user: UserDto) {
        let response;
        try {
            await getManager().transaction(async entityManager => {
                const newUser = await entityManager.save(
                    this.personRepository.create({
                        "per_name": user.firstname,
                        "per_lastname": user.lastname
                    }));

                await entityManager.save(
                    this.userRepository.create({
                        "email": user.email,
                        "password": user.password,
                        "fkIdPerson": { id_person: newUser.id_person }
                    }));

                response = { "code": "3", "message": `Éxito: ${newUser.id_person}` };
            });
        } catch (error) {
            response = { "code": "1", "message": `Error: ${error}` };
        } finally {
            return response;
        }
    }

    async getUserAll() {
        return await this.userRepository.find();
    }
    // { relations: ["fkPerson"] }
    async getUserId(id: number) {
        return await this.userRepository.findOne({ id_user: id }, { relations: ["fkPerson"] });
    }

    async getAccountAll(id: number) {
        return         await this.accountRepository
        .createQueryBuilder("account")
        
        
    
        .where("account.fkIdPerson= :fk_id_persona", { fk_id_persona: id } )
    
       //la fk debe ser tal cual como esta en entities al lado donde se referencia
         .execute();
        return await this.accountRepository.findOneOrFail({ id_account: id }, { relations: ["fkPerson"] });
    }
}
