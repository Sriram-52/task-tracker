import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './models';
import { enhance } from '@zenstackhq/runtime';

@Injectable()
export class PrismaService extends PrismaClient {
  getClient(user?: UserDto) {
    return enhance(this, {
      user: user
        ? {
            id: user?.id,
          }
        : undefined,
    });
  }
}
