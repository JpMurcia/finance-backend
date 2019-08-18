import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) return true
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const hasUserPermission = () => user.permissions.userPermissions.some((permission) => !!permissions.find((item) => item === permission));
    const hasInstitutionPermission = () => user.permissions.institutionPermissions.some((permission) => !!permissions.find((item) => item === permission));
    
    return user && user.permissions && hasUserPermission() && hasInstitutionPermission();
  }
}