import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';

@Module({
  imports: [

 
  ],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
