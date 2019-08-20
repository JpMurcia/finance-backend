import { Controller } from '@nestjs/common';
import { Get, UseGuards, Req, SetMetadata, Param, Post, Body } from '@nestjs/common';
import { DebtorService } from './debtor.service';
import { DebtorDto } from './dto/debtor.dto';
import { get } from 'http';

@Controller('debtor')
export class DebtorController {

  constructor(private readonly DebtorService: DebtorService) { }

  @Get('algo')
  getHello() {
    return this.DebtorService.getHello();
  }


  @Post('create')
  async createDebtor(@Body() body: DebtorDto) {
    {
      const response = await this.DebtorService.CreateDebtort(body);
      return response;
    }
  }


  @Get('allDebtor/:UserId')
  async GetAllDebtor(@Param('UserId') UserId) {
    console.log(UserId)
    // return await this.DebtorService.GetAllDebtor(UserId);
    const response = await this.DebtorService.GetAllDebtor(UserId);
    return response;
  }






}
