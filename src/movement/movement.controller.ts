import { Controller, Get, UseGuards, Req, SetMetadata, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SECRETARY, COORDINATOR, RECTOR, ALL_ADMIN } from '../common/constanst/rol';
import { HEADQUARTER, OBSERVATION } from '../common/constanst/permission';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permission.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PermissionsGuard } from '../common/guards/permission.guard';
import { MovementService } from './movement.service';

@Controller('movement')
export class MovementController {
  [x: string]: any;
  constructor(private readonly MovementService: MovementService) {}

  @Get()
  @UseGuards(AuthGuard('bearer'), PermissionsGuard, RolesGuard)
  //@Roles(ALL_ADMIN)
  @Permissions(HEADQUARTER.name)
  getHello(@Req() request) {
    //Data del usuario: id, email, name, lastname, person_id, rols, permissions
    console.log(request.HEADQUARTER.id);
    
    return this.MovementService.getHello();
  }

  @Get('/:UserId')
  async GetMovement(@Param('UserId') UserId){
    console.log(UserId)
    return this.MovementService.GetMovement(UserId);
  }

 
}