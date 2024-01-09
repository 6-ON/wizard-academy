import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignInDto } from './dto/SignIn.dto';
import { UserService } from '@/user/user.service';
import { UserModule } from '@/user/user.module';
import { Role } from '@/user/roles';

describe('AuthService', () => {
	let authService: AuthService;
	let userRepository: Repository<User>;
	let userService: UserService;
	let user: User;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5433,
					username: 'postgres',
					password: '123456',
					logging: true,
					logger: 'file',
					database: 'testwizard',
					entities: ['src/**/*.entity{.ts,.js}'],
					synchronize: true,
				}),
				JwtModule.register({
					secret: 'secresst',
					secretOrPrivateKey: 'secret',
				}),
				TypeOrmModule.forFeature([User]),
				UserModule,
			],
			providers: [AuthService, UserService],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);

		user = await userService.create({
			email: 'seddik@gmail.com',
			password: 'correctPassword',
			phone: '+212600000000',
			firstName: 'seddik',
			lastName: 'frefefe',
			role: Role.ADMIN,
		});
	});

	afterAll(async () => {
		await userService.remove(user.id);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('signIn', () => {
		it('should login user with phone', async () => {
			const signInDto: SignInDto = {
				password: 'correctPassword',
				phone: '+212600000000',
			};
			const result = await authService.signIn(signInDto);
			expect(result).toHaveProperty('access_token');
			expect(result).toHaveProperty('refresh_token');
		});
		it('should login user with email', async () => {
			const signInDto: SignInDto = {
				password: 'correctPassword',
				email: 'seddik@gmail.com',
			};
			const result = await authService.signIn(signInDto);
			expect(result).toHaveProperty('access_token');
			expect(result).toHaveProperty('refresh_token');
		});
	});
});
