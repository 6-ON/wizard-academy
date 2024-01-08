import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtGuard } from './guards';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { GetUser } from './decorator';
import { User } from '@/user/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}

	@UseGuards(JwtGuard)
	@Get('user')
	getProfile(@GetUser() user: User) {
		return user;
	}
}
