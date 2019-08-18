import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const response = (await this.authService.login(body))[0];
    if(response) 
      return { payload: this.jwtService.sign({ ...response })}
    else
      throw new HttpException({ status: HttpStatus.UNAUTHORIZED, error: "USER_NOT_EXIST", detail: "El usuario no existe" }, HttpStatus.UNAUTHORIZED);
  }
}
