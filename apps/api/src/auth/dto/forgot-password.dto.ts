import { IsEmail } from 'class-validator';

export class ForgotPasswordDto { // Forgotpassword verification with email
  @IsEmail()
  email: string;
}
