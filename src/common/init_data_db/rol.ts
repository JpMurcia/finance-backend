import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { initDataDB } from '../constanst/rol';
import { rol } from '../../../entities/rol';

@Injectable()
export class RolInitDbService {

    data: any = initDataDB

    constructor(
      @InjectRepository(rol, 'schemaUsers')
      private readonly rolRepository: Repository<rol>
    ) {}

    async default(){
      this.data.forEach(async item => {
        const isExist = await this.rolRepository.find({ where: { name: item.name } })

        if(isExist.length == 0) this.rolRepository.save(item)
      });
    }
}
