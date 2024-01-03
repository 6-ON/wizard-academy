import { User } from '@/user/entities/user.entity';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
	(field: keyof User, ctx: ExecutionContext) => {
		const request: Express.Request = ctx.switchToHttp().getRequest();
		if (field) {
			return request.user[field];
		}
		return request.user;
	},
);
