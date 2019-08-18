import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolInitDbService } from '../common/init_data_db/rol';
import { PermissionInitDbService } from '../common/init_data_db/permission';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { user } from '../../entities/user';


@Module({
  imports: [

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
