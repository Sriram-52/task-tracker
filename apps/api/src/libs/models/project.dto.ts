import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
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
}
