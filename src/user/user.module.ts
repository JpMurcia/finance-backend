import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolInitDbService } from '../common/init_data_db/rol';
import { PermissionInitDbService } from '../common/init_data_db/permission';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { user } from '../../entities/user';
import { rol } from '../../entities/rol';
import { permission } from '../../entities/permission';
import { admin_rol } from '../../entities/admin_rol';
import { admin } from '../../entities/admin';
import { student } from '../../entities/student';
import { teacher } from '../../entities/teacher';
import { menu } from '../../entities/menu';
import { plan } from '../../entities/plan';
import { plan_item } from '../../entities/plan_item';
import { institution_plan } from '../../entities/institution_plan';

@Module({
  imports: [
    TypeOrmModule.forFeature([user, rol, permission, admin_rol, admin, teacher, student, menu], 'schemaUsers'),
    TypeOrmModule.forFeature([plan, plan_item, institution_plan], 'schemaBusiness'),
  ],
  controllers: [UserController],
  providers: [UserService, RolInitDbService, PermissionInitDbService],
})
export class UserModule {
  
  constructor(
    private rolInitDbService: RolInitDbService,
    private permissionInitDbService: PermissionInitDbService
  ){
    this.rolInitDbService.default();
    this.permissionInitDbService.default();
  }
}
