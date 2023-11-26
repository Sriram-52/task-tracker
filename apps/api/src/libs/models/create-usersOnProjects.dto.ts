import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersOnProjectsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
