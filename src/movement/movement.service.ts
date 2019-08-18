import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MovementService {
  [x: string]: any;

  constructor(

    // @InjectRepository(grade, 'schemaInstitution')
    // private readonly gradeRepository: Repository<grade>,
    // @InjectRepository(group, 'schemaInstitution')

  ){
  }

  async getHello() {
    return await this.headquarterRepository.find();
  }


  async GetMovement(UserId){
    let movement;
    movement  = await this.movementRepository
    .createQueryBuilder("headquarter")
    .select("headquarter.id", "id")
    .addSelect("headquarter.name", "name")
    .addSelect("headquarter.telephone", "telephone")
    .addSelect("headquarter.email", "email")
    .addSelect("city.name", "city")
    .addSelect("department.name", "departament")
 // .subQuery  
    .innerJoin("city", "city", "city.id = headquarter.fk_city")
    .innerJoin("department","department","department.id=city.fk_department") 

 
    .where("headquarter.id = :headquarter_id", { headquarter_id: UserId } )
  
   
     .execute();
/* */
 
  }

  async GetCoordinateByHeadquarter(headquarterId){
    return await this.headquarterRepository
    .createQueryBuilder("headquarter")
    .select('admin.id', 'adminId')
    .addSelect("ur.email", "email")
    .addSelect("person.name", "name")
    .addSelect("person.lastname", "lastname")
    .addSelect("person.phone", "phone")
    .leftJoin("admin", "admin", "headquarter.fk_admin = admin.id")
    .innerJoin("admin_rol", "admin_rol", "admin_rol.fk_admin = admin.id")
    .innerJoin("rol", "rol", "admin_rol.fk_rol = rol.id")
    .innerJoin("user", "ur", "admin.fk_user = ur.id")
    .innerJoin("person", "person", "person.fk_user = ur.id")
    .where("headquarter.id=:headquarter_id", { headquarter_id: headquarterId})
    .execute()

  }


  
  async getCoordinate() {
    return await this.headquarterRepository
      .createQueryBuilder("headquarter")
      .select('admin.id', 'adminId')
      .addSelect("ur.email", "email")
      .addSelect("person.name", "name")
      .addSelect("person.lastname", "lastname")
      .addSelect("person.phone", "phone")
      .leftJoin("admin", "admin", "headquarter.fk_admin = admin.id")
      .innerJoin("admin_rol", "admin_rol", "admin_rol.fk_admin = admin.id")
      .innerJoin("rol", "rol", "admin_rol.fk_rol = rol.id")
      .innerJoin("user", "ur", "admin.fk_user = ur.id")
      .innerJoin("person", "person", "person.fk_user = ur.id")
      .where("headquarter.id=:idHeadquarter", { idHeadquarter: 2 })
      .execute()
  }


   async GetGroupsByHeadquarter(headquarterId){
    
   let group1= await this.headquarterRepository
    .createQueryBuilder("headquarter")
    .select("grade.id", "gradeId")
    .addSelect("grade.name", "gradeName")
    .addSelect("groupp.max_students", "maxStudents")
    .addSelect("groupp.id", "id")
    .addSelect("groupp.group_name", "name")
    .addSelect("groupp.working_day", "workingDay")
    .addSelect("count(enrollment.fk_student)","studentsTotal")
    
    //.addSelect("COUNT(enrollment.fk_student)", "studentsTotal")
//  // .subQuery  
    .innerJoin("grade", "grade", "headquarter.id = grade.fk_headquarter")
    .innerJoin("group","groupp","grade.id=groupp.fk_grade") 
    .innerJoin("enrollment","enrollment","groupp.id=enrollment.fk_group") 
    

 
    .where("headquarter.id = :headquarter_id", { headquarter_id: headquarterId } )
  
    .groupBy("grade.id")
    .addGroupBy("grade.name")
    .addGroupBy("groupp.max_students")
    .addGroupBy("groupp.id")
    .addGroupBy("groupp.group_name")
    .addGroupBy("groupp.working_day")
  
    .execute();

    
    return 0;
   }








   



}
