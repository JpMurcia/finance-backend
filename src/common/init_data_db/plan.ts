import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { initDataDB } from '../constanst/plan';
// import { plan } from '../../../entities/plan';
// import { plan_item } from '../../../entities/plan_item';

@Injectable()
export class PlanInitDbService {

    data: any = initDataDB

    constructor(
      // @InjectRepository(plan, 'schemaBusiness')
      // private readonly planRepository: Repository<plan>,
      // @InjectRepository(plan_item, 'schemaBusiness')
      // private readonly planItemRepository: Repository<plan_item>
    ) {}

    async default(){
      return this.data.forEach(async plan => {
        // const isExist = await this.planRepository.findOne({ where: { id: plan.id } })
        // if(!isExist){
        //   await this.planRepository.save(plan)
        //   await this.savePermissions(plan);
        // }
      });
    }

    savePermissions(plan): Promise<any>{
      return
      // return Promise.all(plan.permissions.map(async permission => await this.planItemRepository.save({ fkPlan: { id: plan.id }, fkPermission: { id: permission } })))
  }
}
