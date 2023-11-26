import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
