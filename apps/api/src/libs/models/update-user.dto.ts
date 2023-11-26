import { Role } from '../../../node_modules/.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
  @ApiProperty({
    enum: Role,
    default: 'USER',
    required: false,
  })
  @IsOptional()
  role?: Role;
}
