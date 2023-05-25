import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as bcrypt from 'bcryptjs';
import { ADMIN_FLAG, ADMIN_ID } from 'src/constants';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdmin = this.reflector.get<boolean>(
      ADMIN_FLAG,
      context.getHandler(),
    );

    if (!isAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const adminEmail = ADMIN_ID;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      user &&
      user.email === adminEmail &&
      bcrypt.compareSync(adminPassword, user.password)
    ) {
      return true;
    }

    return false;
  }
}
