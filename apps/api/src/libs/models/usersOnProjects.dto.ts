import { ApiProperty } from '@nestjs/swagger';

export class UsersOnProjectsDto {
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
}
