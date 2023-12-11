import { IsEmail, IsString } from 'class-validator';

export class LoginDto { // Login function with email and password
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
