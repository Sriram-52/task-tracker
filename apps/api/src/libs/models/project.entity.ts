import { ApiProperty } from '@nestjs/swagger';
import { UsersOnProjects } from './usersOnProjects.entity';
import { Task } from './task.entity';

export class Project {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  endDate: Date;
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
    type: () => UsersOnProjects,
    isArray: true,
    required: false,
  })
  assignedUsers?: UsersOnProjects[];
  @ApiProperty({
    type: () => Task,
    isArray: true,
    required: false,
  })
  tasks?: Task[];
}
