import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthAdminGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
