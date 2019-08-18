import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { user } from '../../entities/user';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ){}

  async login(body: LoginDto) {
    return await this.userRepository
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addSelect("user.email", "email")
    .addSelect("user.names", "names")
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
      .where("user.id = :userId", { userId: payload.id })
      .getRawOne();
      
      if(response){
        response.rols = await this.userService.getRols(payload.id);
        return response;
      } 
      return false;
    }
    return false;
  }
}
