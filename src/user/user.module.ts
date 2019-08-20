import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { user1 } from '../../entities/user1';
import { person } from '../../entities/person';
import { account } from '../../entities/account';

@Module({
  imports: [
    TypeOrmModule.forFeature([user1, person,account])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
