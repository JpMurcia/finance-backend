import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { movement } from '../../entities/movement';
import { user1 } from '../../entities/user1';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([user1, movement])
  ],
  controllers: [MovementController],
  providers: [MovementService]
})
export class MovementModule {}
