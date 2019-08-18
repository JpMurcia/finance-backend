import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { user } from '../../entities/user';
import { LoginDto } from './dto/login.dto';


import { rol } from '../../entities/rol';
import { student } from '../../entities/student';
import { teacher } from '../../entities/teacher';
import { admin } from '../../entities/admin';
import { admin_rol } from '../../entities/admin_rol';
import { plan } from '../../entities/plan';
import { plan_item } from '../../entities/plan_item';
import { institution_plan } from '../../entities/institution_plan';
import { menu } from '../../entities/menu';
import { SECRETARY, COORDINATOR, RECTOR } from '../common/constanst/rol';
import { response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(user, 'schemaUsers')
    private readonly userRepository: Repository<user>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,

    @InjectRepository(rol, 'schemaUsers') private readonly rolRepository: Repository<rol>,
    @InjectRepository(menu, 'schemaUsers') private readonly menuRepository: Repository<menu>,
    @InjectRepository(student, 'schemaUsers') private readonly studentRepository: Repository<student>,
    @InjectRepository(teacher, 'schemaUsers') private readonly teacherRepository: Repository<teacher>,
    @InjectRepository(admin, 'schemaUsers') private readonly adminRepository: Repository<admin>,
    @InjectRepository(admin_rol, 'schemaUsers') private readonly adminRolRepository: Repository<admin_rol>,
    @InjectRepository(plan, 'schemaBusiness') private readonly planRepository: Repository<plan>,
    @InjectRepository(plan_item, 'schemaBusiness') private readonly planItemRepository: Repository<plan_item>,
    @InjectRepository(institution_plan, 'schemaBusiness') private readonly institutionPlanRepository: Repository<institution_plan>,


  ){}

  async login(body: LoginDto) {
    return await this.userRepository
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.email", "email")
    .addSelect("person.name", "name")
    .addSelect("person.lastname", "lastname")
    .innerJoin("person", "person", "person.fk_user = user.id")
    .where("user.email = :email and user.password = :password", { email: body.email, password: body.password })
    .execute();
  }

  async validateUser(token: string): Promise<any> {
    let payload: any = this.jwtService.decode(token);
    if(payload) {
      let response = await this.userRepository
      .createQueryBuilder("user")
      .select("user.id", "id")
      .addSelect("user.email", "email")
      .addSelect("person.id", "person_id")
      .innerJoin("person", "person", "person.fk_user = user.id")
      .where("user.id = :user_id", { user_id: payload.id })
      .execute();
      
      if(response.length > 0){
        response[0].rols = await this.userService.getRols(payload.id);
        response[0].permissions = await this.userService.getPermissions(payload.id);
        return response[0];
      } 
      return false;
    }
    return false;
  }


  async getPermissions(userId){
    let algo = await this.userService.getPermissions(userId);
   // response[0].institution = await this.userService.getPermissions(userId);
  //  response[0].Permissions = await this.userService.getPermissions(userId);
    //Obtener los permisos de la institucion 
    let userPermissions=algo.userPermissions;
    let institutionPermissions=algo.institutionPermissions;

    let userRols  = await this.userRepository
    .createQueryBuilder("user")
    .select("rol.name", "name")
    
    .innerJoin("admin", "admin", "admin.fk_user = user.id")
    .innerJoin("admin_rol", "admin_rol", "admin_rol.fk_admin = admin.id")
    .innerJoin("rol", "rol", "admin_rol.fk_rol = rol.id")
    .where("user.id = :user_id", { user_id: userId })
    .execute();

    return { userRols,userPermissions, institutionPermissions }

    //return response[0]


  }



}
