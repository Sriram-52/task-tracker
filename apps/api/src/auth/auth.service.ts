import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SupabaseService } from 'src/libs/supabase.service';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/libs/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/libs/models';
import { LoginDto } from './dto/login.dto';
import { SessionDto } from './dto/session.dto';
import { LoginWithTokenDto } from './dto/login-with-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supbase: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const { data, error } = await this.supbase.client.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const user = await this.prisma.getClient().user.findUnique({
      where: {
        id: data.user.id,
      },
    });
    const session: SessionDto = {
      user: user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
    return session;
  }

  async register(registerDto: RegisterDto) {
    const { data, error } = await this.supbase.client.auth.signUp({
      email: registerDto.email,
      password: registerDto.password,
      options: {
        emailRedirectTo: '',
      },
    });
    if (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const user = await this.prisma.getClient().user.create({
      data: {
        id: data.user.id,
        email: data.user.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      },
    });
    return plainToInstance(UserDto, user);
  }

  async forgotPassword(email: string) {
    const { error } =
      await this.supbase.client.auth.resetPasswordForEmail(email);
    if (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async loginWithToken(loginWithTokenDto: LoginWithTokenDto) {
    const { data, error } = await this.supbase.client.auth.getUser(
      loginWithTokenDto.accessToken,
    );
    if (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.user.id,
      },
    });
    const session: SessionDto = {
      user: user,
      accessToken: loginWithTokenDto.accessToken,
      refreshToken: loginWithTokenDto.refreshToken,
    };
    return session;
  }
}
