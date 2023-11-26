import { IsString } from 'class-validator';

export class LoginWithTokenDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
