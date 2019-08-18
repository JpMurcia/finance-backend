import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeadQuarterController } from './headquarter.controller';
import { HeadQuarterService } from './headquarter.service';
import { headquarter } from '../../entities/headquarter';
import { person } from '../../entities/person';
import { institution } from '../../entities/institution';
import { user } from '../../entities/user';
import { rol } from '../../entities/rol';
import { admin } from '../../entities/admin';
import { admin_rol } from '../../entities/admin_rol';
import { teacher } from '../../entities/teacher';
import { tutor } from '../../entities/tutor';
import { course } from '../../entities/course';
import { score } from '../../entities/score';
import { grade } from '../../entities/grade';
import { group } from '../../entities/group';
import { subject_institution } from '../../entities/subject_institution';
import { city } from '../../entities/city';
import { department } from '../../entities/department';

@Module({
  imports: [
    TypeOrmModule.forFeature([headquarter,institution,grade,group,city,department], 'schemaInstitution'),
    TypeOrmModule.forFeature([person,user,rol,admin,admin_rol,teacher], 'schemaUsers'),
    TypeOrmModule.forFeature([tutor,course,subject_institution], 'schemaAcademic')
  ],
  controllers: [HeadQuarterController],
  providers: [HeadQuarterService],
})
export class HeadQuarterModule {}
