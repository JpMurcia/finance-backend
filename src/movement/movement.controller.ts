import { Controller } from '@nestjs/common';
import {  Get, UseGuards, Req, SetMetadata, Param } from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller('movement')
export class MovementController {

    constructor(private readonly MovementService: MovementService){}

    getHello() {
        
        console.log("cxxc");
        
        return this.MovementService.getHello();
      }
    

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
