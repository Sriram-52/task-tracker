import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LibsModule } from './libs/libs.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({ load: [configuration] }),
    AuthModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
    LibsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
