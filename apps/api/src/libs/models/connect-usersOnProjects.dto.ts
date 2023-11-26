import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UsersOnProjectsUserIdProjectIdUniqueInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectId: string;
}

@ApiExtraModels(UsersOnProjectsUserIdProjectIdUniqueInputDto)
export class ConnectUsersOnProjectsDto {
  @ApiProperty({
    type: UsersOnProjectsUserIdProjectIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UsersOnProjectsUserIdProjectIdUniqueInputDto)
  userId_projectId: UsersOnProjectsUserIdProjectIdUniqueInputDto;
}
