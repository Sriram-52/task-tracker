import { IsStrongPassword } from 'class-validator';
import { CreateUserDto } from 'src/libs/models';

export class RegisterDto extends CreateUserDto {
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol',
    },
  )
  password: string;
}
