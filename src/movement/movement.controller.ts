import { Controller } from '@nestjs/common';
import {  Get, UseGuards, Req, SetMetadata, Param ,Post,Body} from '@nestjs/common';
import { MovementService } from './movement.service';
import {MovementDto} from './dto/movement.dto';

@Controller('movement')
export class MovementController {

    constructor(private readonly MovementService: MovementService){}

    @Post('create')
    async createMovement(@Body() body: MovementDto){{
     // const response = await this.MovementService.createMovement(body);
      //  return response;
    }}
    

    @Get('all/:UserId')
    async GetMovement(@Param('UserId') UserId){
      console.log(UserId)
      return this.MovementService.GetMovement(UserId);
    }

    @Get('getAll')
    async getUserAll(){{
        const response = await this.MovementService.getMovementAll();
        return response;
    }}

    @Get('-/:UserId')
    async GetMovementGastos(@Param('UserId') UserId){
      console.log(UserId)
      return this.MovementService.GetMovementGasto(UserId);
    }

    @Get('ingresos/:UserId')
    async GetMovementIngresos(@Param('UserId') UserId){
      console.log(UserId)
      return this.MovementService.GetMovementIngreso(UserId);
    }
  
}
