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
import { user_rol } from '../../entities/user_rol';

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigService.app.jwtKey,
      signOptions: { expiresIn: ConfigService.app.jwtExpires }
    }),
    TypeOrmModule.forFeature([user, rol, user_rol]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy, UserService],
})
export class AuthModule {}
