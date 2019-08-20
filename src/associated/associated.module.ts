import { Module } from '@nestjs/common';
import { AssociatedController } from './associated.controller';
import { AssociatedService } from './associated.service';

@Module({
  controllers: [AssociatedController],
  providers: [AssociatedService]
})
export class AssociatedModule {}
