import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() loginDto: LoginDto): void {
		this.authService.login();
	}

	@Get('refresh-token')
	accessToken(): void {
		this.authService.generateRefreshToken();
	}
}
