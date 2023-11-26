import { ApiProperty } from '@nestjs/swagger';

export class UsersOnTasksDto {
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
}
