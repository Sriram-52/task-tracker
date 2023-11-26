import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto, UserDto } from 'src/libs/models';
import { PrismaService } from 'src/libs/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.getClient().user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return plainToInstance(UserDto, result);
  }

  async findOne(id: string) {
    const result = await this.prisma.getClient().user.findUnique({
      where: {
        id: id,
      },
    });
    return plainToInstance(UserDto, result);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.prisma.getClient().user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    return plainToInstance(UserDto, result);
  }
}
