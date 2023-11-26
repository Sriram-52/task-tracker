import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsersOnProjectsDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  projectId?: string;
}
