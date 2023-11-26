import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { UserDto } from 'src/libs/models';

export class SessionDto {
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  user: UserDto;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
