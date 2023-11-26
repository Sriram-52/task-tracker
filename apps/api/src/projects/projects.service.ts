import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Project, ProjectDto } from 'src/libs/models';
import { PrismaService } from 'src/libs/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const { assignedUsers, ...rest } = createProjectDto;
    const result = await this.prisma.getClient().project.create({
      data: {
        ...rest,
      },
    });
    if (assignedUsers.length > 0) {
      await this.prisma.getClient().usersOnProjects.createMany({
        data: assignedUsers.map((userId) => ({
          userId,
          projectId: result.id,
        })),
      });
    }
    return plainToInstance(ProjectDto, result);
  }

  async findAll() {
    const result = await this.prisma
      .getClient()
      .project.findMany({ orderBy: { createdAt: 'desc' } });
    return plainToInstance(ProjectDto, result);
  }

  async findOne(id: string) {
    const result = await this.prisma.getClient().project.findUnique({
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

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { assignedUsers, ...rest } = updateProjectDto;
    const result = await this.prisma.getClient().project.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
    if (assignedUsers) {
      await this.prisma.getClient().usersOnProjects.deleteMany({
        where: {
          projectId: id,
        },
      });
      await this.prisma.getClient().usersOnProjects.createMany({
        data: assignedUsers.map((userId) => ({
          userId,
          projectId: id,
        })),
      });
    }
    return plainToInstance(ProjectDto, result);
  }

  async remove(id: string) {
    const tasks = await this.prisma.getClient().task.findMany({
      where: {
        projectId: id,
      },
    });
    await this.prisma.getClient().usersOnProjects.deleteMany({
      where: {
        projectId: id,
      },
    });
    await this.prisma.getClient().usersOnTasks.deleteMany({
      where: {
        taskId: {
          in: tasks.map((task) => task.id),
        },
      },
    });
    await this.prisma.getClient().task.deleteMany({
      where: {
        projectId: id,
      },
    });
    const result = await this.prisma.getClient().project.delete({
      where: {
        id: id,
      },
    });
    return plainToInstance(ProjectDto, result);
  }
}
