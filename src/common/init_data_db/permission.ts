import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { initDataDB } from '../constanst/permission';


@Injectable()
export class PermissionInitDbService {

    data: any = initDataDB

    constructor(
      // @InjectRepository(permission, 'schemaUsers')
      // private readonly permissionRepository: Repository<permission>
    ) {}

    async default(){
      this.data.forEach(async item => {
        // const isExist = await this.permissionRepository.findOne({ where: { id: item.id } })

        // if(!isExist) this.permissionRepository.save(item)
      });
    }
}
