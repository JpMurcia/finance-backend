import { Controller, Post, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

import {UserDto} from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('create')
    async createUser(@Body() body: UserDto){{
        const response = await this.userService.createUser(body);
        return response;
    }}
    
    @Get('getAll')
    async getUserAll(){{
        const response = await this.userService.getUserAll();
        return response;
    }}
    
    @Get('getId/:id')
    async getUserId(@Param('id') id: number){{
        const response = await this.userService.getUserId(id);
        return response;
    }}

    @Get('getAccountId/:id')
    async getAccountId(@Param('id') id: number){{
        const response = await this.userService.getAccountAll(id);
        return response;
    }}
}
