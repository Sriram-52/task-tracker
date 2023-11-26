import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UsersOnTasksUserIdTaskIdUniqueInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskId: string;
}

@ApiExtraModels(UsersOnTasksUserIdTaskIdUniqueInputDto)
export class ConnectUsersOnTasksDto {
  @ApiProperty({
    type: UsersOnTasksUserIdTaskIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UsersOnTasksUserIdTaskIdUniqueInputDto)
  userId_taskId: UsersOnTasksUserIdTaskIdUniqueInputDto;
}
