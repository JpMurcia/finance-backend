import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MovementModule } from './movement/movement.module';
import { AuthModule } from './auth/auth.module';
import { AssociatedModule } from './associated/associated.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MovementModule, 
    AuthModule, 
    AssociatedModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
