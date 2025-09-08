import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DefaultCategoriesService } from 'src/categories/providers/default-categories.service';

@Injectable()
export class EnsureDefaultCategoriesGuard implements CanActivate {
  constructor(private readonly defaults: DefaultCategoriesService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const userId: number | undefined = req.user?.sub;

    if (!userId) return true;
    console.log(req);
    if (req.user.role === 'COMPANY') return true; // company doesn't have default categories
    await this.defaults.ensureForUser(userId);
    return true;
  }
}
