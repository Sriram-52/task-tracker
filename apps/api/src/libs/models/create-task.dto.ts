import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  priority: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
