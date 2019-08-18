import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { headquarter } from '../../entities/headquarter';
import { grade } from '../../entities/grade';
import { group } from '../../entities/group';
import { teacher } from '../../entities/teacher';
import { student } from '../../entities/student';
import { rol } from '../../entities/rol';
import { person } from '../../entities/person';
import { user } from '../../entities/user';
import { institution } from '../../entities/institution';
import { admin } from '../../entities/admin';
import { admin_rol } from '../../entities/admin_rol';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HeadQuarterService {
  [x: string]: any;

  constructor(
    @InjectRepository(headquarter, 'schemaInstitution')
    private readonly headquarterRepository: Repository<headquarter>,

      @InjectRepository(person, 'schemaUsers')
      private readonly personRepository: Repository<person>,
     @InjectRepository(institution, 'schemaInstitution')
     private readonly institutionRepository: Repository<institution>,
    // @InjectRepository(grade, 'schemaInstitution')
    // private readonly gradeRepository: Repository<grade>,
    // @InjectRepository(group, 'schemaInstitution')
    // private readonly groupRepository: Repository<group>,
    // @InjectRepository(teacher, 'schemaUsers')
    // private readonly teacherRepository: Repository<teacher>,
    // @InjectRepository(student, 'schemaUsers')
    // private readonly studentRepository: Repository<student>,
    // @InjectRepository(rol, 'schemaUsers')
    // private readonly rolRepository: Repository<rol>,
    
    // @InjectRepository(user, 'schemaUsers')
    // private readonly userRepository: Repository<user>,
  ){
  }

  async getHello() {
    return await this.headquarterRepository.find();
  }


  async GetHeadquarter(headquarterId){
    let headquarter;
    headquarter  = await this.headquarterRepository
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

 
    .where("headquarter.id = :headquarter_id", { headquarter_id: headquarterId } )
  
   
     .execute();
/* */
    let  coordinate =  await this.GetCoordinateByHeadquarter(headquarterId)
  
    let teacher =  await this.GetTeachersByHeadquarter(headquarterId)
   let groups =  await this.GetGroupsByHeadquarter(headquarterId)

    return {headquarter,coordinate,groups,teacher};
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

  //   return   await this.personRepository
  //   .createQueryBuilder("person")
  //   .select("admin.id", "adminId")
  //  // .addSelect("headquarter.id", "id")
  //   .addSelect("userr.email", "email")
  //   .addSelect("person.name", "name")
  //   .addSelect("person.lastname", "lastname")
  //   .addSelect("person.phone", "phone")  
  //   .addSelect("rol.name", "rol_name")        
  //   // .innerJoin("user", "userr", "userr.id = person.fk_user")
  //   // .innerJoin("institution","insti","insti.id=userr.fk_institution") 
  //   // .innerJoin("headquarter","headquarter","insti.id=headquarter.fk_institution") 
  //   // .innerJoin("admin", "admin", "admin.id = headquarter.fk_admin")
  //   // .innerJoin("admin_rol", "admin_rol", "admin.id = admin_rol.fk_admin")
  //   // .innerJoin("rol", "rol", "rol.id = admin_rol.fk_rol")  

  //   //.where("headquarter.id = :headquarter_id", { headquarter_id: headquarterId })
  //   .where("headquarter.id = :headquarter_id", { headquarter_id: headquarterId }) 
  //   //.andWhere("rol.id = '2'")
  //   .andWhere("rol.name = 'coordinator'")

  //   .execute();

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

    let hola =this.GetTeachersByGroup(group1.id);
    return group1.map(item => ({
   
   gradeId:  item.gradeId,
   gradeName: item.gradeName, 
   maxStudents: item.maxStudents, 
   id: item.id, 
   name: item.name, //name del grupo   
   workingDay: item.workingDay,
   teacher: this.GetTeachersByGroup(item.id),
   studentsTotal: item.studentsTotal,
    // headquarter: {
    //     id: item.idHeadquarter,
    //     name: item.nameHeadquarter
    // }
}))








   }


  async GetTeachersByHeadquarter(headquarterId){
    


    return await this.personRepository
    .createQueryBuilder("person")
    .select("teacher.id", "Id")
   // .addSelect("headquarter.id", "id")
    .addSelect("userr.email", "email")
    .addSelect("person.name", "name")
    .addSelect("person.lastname", "lastname")
    .addSelect("person.phone", "phone")  
    //.addSelect("rol.name", "rol_name") 
 
    .innerJoin("user", "userr", "userr.id = person.fk_user")
    .innerJoin("teacher","teacher","userr.id=teacher.fk_user") 
    .innerJoin("tutor","tutor","teacher.id=tutor.fk_teacher") 
    .innerJoin("course", "course", "course.id = tutor.fk_course")
    .innerJoin("subject_institution", "subject_i", "course.fk_subject = subject_i.id")
    .innerJoin("group", "groupp", "subject_i.fk_group = groupp.id")
    .innerJoin("grade", "grade", "grade.id = groupp.fk_grade")
     .innerJoin("headquarter", "headquarter", "headquarter.id = grade.fk_headquarter")
    
    //.where("course.id = :course_id", { course_id: headquarterId }) 
   
    .where("headquarter.id = :headquarter_id", { headquarter_id: headquarterId }) 
    //  .andWhere("rol.name = 'Estudiante'")
    .execute();

   }


   async GetTeachersByGroup(groupId){
    


    return   await this.personRepository
    .createQueryBuilder("person")
    .select("teacher.id", "Id")
   // .addSelect("headquarter.id", "id")
    .addSelect("userr.email", "email")
    .addSelect("person.name", "name")
    .addSelect("person.lastname", "lastname")
    .addSelect("person.phone", "phone")  
    //.addSelect("rol.name", "rol_name") 
 
    .innerJoin("user", "userr", "userr.id = person.fk_user")
    .innerJoin("teacher","teacher","userr.id=teacher.fk_user") 
    .innerJoin("tutor","tutor","teacher.id=tutor.fk_teacher") 
    .innerJoin("course", "course", "course.id = tutor.fk_course")
    .innerJoin("subject_institution", "subject_i", "course.fk_subject = subject_i.id")
     .innerJoin("group", "groupp", "subject_i.fk_group = groupp.id")
     .innerJoin("grade", "grade", "grade.id = group.fk_grade")
     .innerJoin("headquarter", "headquarter", "headquarter.id = grade.fk_headquarter")
    
   // .where("course.id = :course_id", { course_id: groupId }) 

    .where("groupp.id = : group_id", {  group_id:  groupId }) 
   
    //.where("group.id = : group_id", {  group_id:  groupId }) 
    
    //  .andWhere("rol.name = 'Estudiante'")
    .execute();
   }



}
