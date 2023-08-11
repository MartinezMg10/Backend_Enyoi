import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports:[
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  exports:[
    TaskService,
    TypeOrmModule,
  ]
})
export class TaskModule {}
