import { IsString } from 'class-validator';

export class LoginWithTokenDto { //login with accesstoken
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
