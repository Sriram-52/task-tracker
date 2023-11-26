import { ApiProperty } from '@nestjs/swagger';
import { Project } from './project.entity';
import { User } from './user.entity';

export class UsersOnProjects {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  projectId: string;
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
    type: () => Project,
    required: false,
  })
  project?: Project;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
}
