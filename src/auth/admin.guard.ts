// src/auth/admin.guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        // Проверяем, что пользователь есть и его роль admin
        if (!user || user.role !== 'admin') {
            throw new ForbiddenException('Доступ только для админа');
        }

        return true; // разрешаем доступ
    }
}
