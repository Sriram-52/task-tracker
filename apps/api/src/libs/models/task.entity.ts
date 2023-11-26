import { ApiProperty } from '@nestjs/swagger';
import { Project } from './project.entity';
import { UsersOnTasks } from './usersOnTasks.entity';

export class Task {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  priority: string;
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
  @ApiProperty()
  projectId: string;
  @ApiProperty({
    type: () => Project,
    required: false,
  })
  project?: Project;
  @ApiProperty({
    type: () => UsersOnTasks,
    isArray: true,
    required: false,
  })
  assignedUsers?: UsersOnTasks[];
}
