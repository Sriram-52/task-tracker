import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Task, TaskDto } from 'src/libs/models';
import { PrismaService } from 'src/libs/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { assignedUsers, ...rest } = createTaskDto;
    const result = await this.prisma.getClient().task.create({
      data: {
        ...rest,
      },
    });
    await this.prisma.getClient().usersOnTasks.createMany({
      data: assignedUsers.map((userId) => ({
        userId,
        taskId: result.id,
      })),
    });
    return plainToInstance(TaskDto, result);
  }

  async findAll(projectId: string) {
    const result = await this.prisma.getClient().task.findMany({
      where: { projectId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return plainToInstance(TaskDto, result);
  }

  async findOne(id: string) {
    const result = await this.prisma.getClient().task.findUnique({
      where: {
        id: id,
      },
      include: {
        assignedUsers: true,
      },
    });
    return plainToInstance(Task, result);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { assignedUsers, ...rest } = updateTaskDto;
    const result = await this.prisma.getClient().task.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
    if (assignedUsers !== undefined) {
      await this.prisma.getClient().usersOnTasks.deleteMany({
        where: {
          taskId: id,
        },
      });
      await this.prisma.getClient().usersOnTasks.createMany({
        data: assignedUsers.map((userId) => ({
          userId,
          taskId: result.id,
        })),
      });
    }
    return plainToInstance(TaskDto, result);
  }

  async remove(id: string) {
    const result = await this.prisma.getClient().task.delete({
      where: {
        id: id,
      },
    });
    return plainToInstance(TaskDto, result);
  }
}
