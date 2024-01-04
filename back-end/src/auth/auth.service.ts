import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/SignIn.dto';
import { verify } from 'argon2';
import { User } from '@/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectRepository(User) private userRpo: Repository<User>,
	) {}

	async signIn({ email, password, phone }: SignInDto) {
		let user: User;
		if (email) user = await this.findUserBy({ email });
		if (phone) user = await this.findUserBy({ phone });

		if (!user) throw new UnprocessableEntityException('wrong credentials');
		if (!(await verify(user.password, password)))
			throw new UnprocessableEntityException('wrong credentials');
		const payloadJwt = {
			sub: user.id,
			role: user.role,
			email: user.email,
		};
		return {
			access_token: await this.jwtService.signAsync(payloadJwt, {
				expiresIn: '1h',
			}),
			refresh_token: await this.jwtService.signAsync(payloadJwt, {
				expiresIn: '1d',
			}),
		};
	}

	findUserBy(where: Partial<User>) {
		return this.userRpo.findOne({
			where,
			select: ['password'],
		});
	}
}
