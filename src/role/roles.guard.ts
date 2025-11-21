// import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
//
// @Injectable()
// export class AdminGuard implements CanActivate {
//     canActivate(context: ExecutionContext) {
//         const req = context.switchToHttp().getRequest();
//         const user = req.user;
//
//         if (user.role !== 'admin') {
//             throw new ForbiddenException('Доступ только для админа');
//         }
//
//         return true;
//     }
// }
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user || user.role !== 'admin') {
            throw new ForbiddenException('Доступ только для админа');
        }

        return true;
    }
}
