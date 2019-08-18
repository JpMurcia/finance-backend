import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { HttpStrategy } from '../common/strategys/http.strategy';
import { UserService } from '../user/user.service';
import ConfigService from '../common/config/config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { user } from '../../entities/user';
import { rol } from '../../entities/rol';
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
    JwtModule.register({
      secret: ConfigService.app.jwtKey,
      signOptions: { expiresIn: ConfigService.app.jwtExpires }
    }),
    TypeOrmModule.forFeature([user, rol, admin_rol, admin, student, teacher, menu], 'schemaUsers'),
    TypeOrmModule.forFeature([plan, plan_item, institution_plan], 'schemaBusiness')
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy, UserService],
})
export class AuthModule {}
