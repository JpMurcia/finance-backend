import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../../entities/user';

import { SECRETARY, COORDINATOR, RECTOR } from '../common/constanst/rol';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(user, 'schemaUsers') private readonly userRepository: Repository<user>,
  
  ){
  }

  async getHello() {
    return await this.userRepository.find();
  }

  async getRols(userId){
    // let rols = [];
    // let isStudent = await this.studentRepository.findOne({ where: { fkUser: { id: userId }}});
    // let isTeacher = await this.teacherRepository.findOne({ where: { fkUser: { id: userId }}});
    // let isAdmin = await this.adminRepository.findOne({ where: { fkUser: { id: userId }}});
    // let isRols;
    // if(isAdmin) {
    //   isRols = await this.adminRolRepository.find({ relations: ["fkRol"], where: { fkAdmin: { id: isAdmin.id} } });
      
    //   isRols.map(rol => {
    //     if(rol.fkRol.id == SECRETARY.id) rols.push(SECRETARY.name);
    //     if(rol.fkRol.id == COORDINATOR.id) rols.push(COORDINATOR.name);
    //     if(rol.fkRol.id == RECTOR.id) rols.push(RECTOR.name);
    //   });
    // }
    
    // if(isStudent) rols.push('student');
    // if(isTeacher) rols.push('teacher');
    
    // return rols;
  }

  async getPermissions(userId){
    //Obtener los permisos de la institucion 
    const user = await this.userRepository.findOne({ relations: ["fkInstitution"], where: { id: userId } });
 

    return {  }
  }
}
