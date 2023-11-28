import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return false;
    }
    return this.supabase.client.auth.getUser(token).then((userResponse) => {
      if (!userResponse) {
        return false;
      }
      return this.prisma.user
        .findUnique({
          where: {
            id: userResponse.data.user.id,
          },
        })
        .then((user) => {
          if (!user) {
            return false;
          }
          request.user = user;
          return true;
        });
    });
  }
}
