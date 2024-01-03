import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	// constructor(
	// ) {
	// 	super();
	// }
	// async canActivate(context: ExecutionContext): Promise<boolean> {
	// 	return true;
	// }
}
