import { Module } from '@nestjs/common';
import { DebtorController } from './debtor.controller';
import { DebtorService } from './debtor.service';
import { debtor } from '../../entities/Debtor';
import { user1 } from '../../entities/user1';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([user1, debtor])
  ],
  controllers: [DebtorController],
  providers: [DebtorService]
})
export class DebtorModule {}

