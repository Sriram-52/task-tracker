import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, SupabaseService, AuthGuard],
  exports: [PrismaService, SupabaseService, AuthGuard],
})
export class LibsModule {}
