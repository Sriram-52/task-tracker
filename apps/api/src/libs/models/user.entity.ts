import { Role } from '../../../node_modules/.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UsersOnProjects } from './usersOnProjects.entity';
import { UsersOnTasks } from './usersOnTasks.entity';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty({
    enum: Role,
  })
  role: Role;
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
  assignedProjects?: UsersOnProjects[];
  @ApiProperty({
    type: () => UsersOnTasks,
    isArray: true,
    required: false,
  })
  assignedTasks?: UsersOnTasks[];
}
