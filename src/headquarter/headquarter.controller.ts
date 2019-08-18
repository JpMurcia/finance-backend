import { Controller, Get, UseGuards, Req, SetMetadata, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SECRETARY, COORDINATOR, RECTOR, ALL_ADMIN } from '../common/constanst/rol';
import { HEADQUARTER, OBSERVATION } from '../common/constanst/permission';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permission.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PermissionsGuard } from '../common/guards/permission.guard';
import { HeadQuarterService } from './headquarter.service';

@Controller('headquarter')
export class HeadQuarterController {
  [x: string]: any;
  constructor(private readonly headQuarterService: HeadQuarterService) {}

  @Get()
  @UseGuards(AuthGuard('bearer'), PermissionsGuard, RolesGuard)
  //@Roles(ALL_ADMIN)
  @Permissions(HEADQUARTER.name)
  getHello(@Req() request) {
    //Data del usuario: id, email, name, lastname, person_id, rols, permissions
    console.log(request.HEADQUARTER.id);
    
    return this.headQuarterService.getHello();
  }

  @Get('/:headquarterId')
  async GetHeadquarter(@Param('headquarterId') headquarterId){
    console.log(headquarterId)
    return this.headQuarterService.GetHeadquarter(headquarterId);
  }

 
}