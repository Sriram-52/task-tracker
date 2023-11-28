import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Project, ProjectDto, UserDto } from 'src/libs/models';
import { PrismaService } from 'src/libs/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, user: UserDto) {
    const { assignedUsers, ...rest } = createProjectDto;
    const result = await this.prisma.getClient(user).project.create({
      data: {
        ...rest,
      },
    });
    if (assignedUsers.length > 0) {
      await this.prisma.getClient(user).usersOnProjects.createMany({
        data: assignedUsers.map((userId) => ({
          userId,
          projectId: result.id,
        })),
      });
    }
    return plainToInstance(ProjectDto, result);
  }

  async findAll(user: UserDto) {
    const result = await this.prisma
      .getClient(user)
      .project.findMany({ orderBy: { createdAt: 'desc' } });
    return plainToInstance(ProjectDto, result);
  }

  async findOne(id: string, user: UserDto) {
    const result = await this.prisma.getClient(user).project.findUnique({
      where: {
        id: id,
      },
      include: {
        assignedUsers: {
          include: {
            user: true,
          },
        },
      },
    });
    return plainToInstance(Project, result);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, user: UserDto) {
    const { assignedUsers, ...rest } = updateProjectDto;
    const result = await this.prisma.getClient(user).project.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
    if (assignedUsers) {
      await this.prisma.getClient(user).usersOnProjects.deleteMany({
        where: {
          projectId: id,
        },
      });
      await this.prisma.getClient(user).usersOnProjects.createMany({
        data: assignedUsers.map((userId) => ({
          userId,
          projectId: id,
        })),
      });
    }
    return plainToInstance(ProjectDto, result);
  }

  async remove(id: string, user: UserDto) {
    const tasks = await this.prisma.getClient(user).task.findMany({
      where: {
        projectId: id,
      },
    });
    await this.prisma.getClient(user).usersOnProjects.deleteMany({
      where: {
        projectId: id,
      },
    });
    await this.prisma.getClient(user).usersOnTasks.deleteMany({
      where: {
        taskId: {
          in: tasks.map((task) => task.id),
        },
      },
    });
    await this.prisma.getClient(user).task.deleteMany({
      where: {
        projectId: id,
      },
    });
    const result = await this.prisma.getClient(user).project.delete({
      where: {
        id: id,
      },
    });
    return plainToInstance(ProjectDto, result);
  }
}
