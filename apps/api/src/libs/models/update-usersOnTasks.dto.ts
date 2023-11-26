import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsersOnTasksDto {
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
  taskId?: string;
}
