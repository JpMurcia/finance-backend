import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../../entities/user';
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

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(user, 'schemaUsers') private readonly userRepository: Repository<user>,
    @InjectRepository(rol, 'schemaUsers') private readonly rolRepository: Repository<rol>,
    @InjectRepository(menu, 'schemaUsers') private readonly menuRepository: Repository<menu>,
    @InjectRepository(student, 'schemaUsers') private readonly studentRepository: Repository<student>,
    @InjectRepository(teacher, 'schemaUsers') private readonly teacherRepository: Repository<teacher>,
    @InjectRepository(admin, 'schemaUsers') private readonly adminRepository: Repository<admin>,
    @InjectRepository(admin_rol, 'schemaUsers') private readonly adminRolRepository: Repository<admin_rol>,
    @InjectRepository(plan, 'schemaBusiness') private readonly planRepository: Repository<plan>,
    @InjectRepository(plan_item, 'schemaBusiness') private readonly planItemRepository: Repository<plan_item>,
    @InjectRepository(institution_plan, 'schemaBusiness') private readonly institutionPlanRepository: Repository<institution_plan>,
  ){
  }

  async getHello() {
    return await this.userRepository.find();
  }

  async getRols(userId){
    let rols = [];
    let isStudent = await this.studentRepository.findOne({ where: { fkUser: { id: userId }}});
    let isTeacher = await this.teacherRepository.findOne({ where: { fkUser: { id: userId }}});
    let isAdmin = await this.adminRepository.findOne({ where: { fkUser: { id: userId }}});
    let isRols;
    if(isAdmin) {
      isRols = await this.adminRolRepository.find({ relations: ["fkRol"], where: { fkAdmin: { id: isAdmin.id} } });
      
      isRols.map(rol => {
        if(rol.fkRol.id == SECRETARY.id) rols.push(SECRETARY.name);
        if(rol.fkRol.id == COORDINATOR.id) rols.push(COORDINATOR.name);
        if(rol.fkRol.id == RECTOR.id) rols.push(RECTOR.name);
      });
    }
    
    if(isStudent) rols.push('student');
    if(isTeacher) rols.push('teacher');
    
    return rols;
  }

  async getPermissions(userId){
    //Obtener los permisos de la institucion 
    const user = await this.userRepository.findOne({ relations: ["fkInstitution"], where: { id: userId } });
    const institution = await this.institutionPlanRepository.findOne({ relations: ["fkPlan"], where: { fkInstitution: user.fkInstitution } });
    let institutionPermissions: any = await this.planItemRepository.find({ relations: ["fkPermission"], where: { fkPlan: institution.fkPlan } });
    //Verificar los permisos del usuario
    let userPermissions: any = await this.menuRepository.find({ relations: ["fkPermission"], where: { fkUser: { id: userId } } });

    institutionPermissions = institutionPermissions.map(institution => institution.fkPermission.name);
    userPermissions = userPermissions.map(menu => menu.fkPermission.name);

    return { userPermissions, institutionPermissions }
  }
}
