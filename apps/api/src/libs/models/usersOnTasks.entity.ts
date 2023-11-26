import { ApiProperty } from '@nestjs/swagger';
import { Task } from './task.entity';
import { User } from './user.entity';

export class UsersOnTasks {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  taskId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: () => Task,
    required: false,
  })
  task?: Task;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
}
