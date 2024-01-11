import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator';
import { User } from '@/user/entities/user.entity';
import { Role } from '@/user/roles';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	matchRoles(roles: Role[], role: Role) {
		return roles.includes(role);
	}
	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get(Roles, context.getHandler());
		if (!roles) return true;
		const request = context.switchToHttp().getRequest();
		const user: User = request.user;
		return this.matchRoles(roles, user.role);
	}
}
