import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { academicSchema, usersSchema, institutionSchema, businessSchema } from './common/config/typeorm.service';

import { CommonModule } from './common/common.module';


@Module({
  imports: [
  
    CommonModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
