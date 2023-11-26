import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { LibsModule } from 'src/libs/libs.module';

@Module({
  imports: [LibsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
