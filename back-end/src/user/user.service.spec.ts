import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Role } from './roles';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './entities/user.subscriber';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
	let service: UserService;
	let createdUser: User;
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5432,
					username: 'postgres',
					password: 'root',
					logging: true,
					logger: 'file',
					database: 'wizard_testing',
					entities: ['src/**/*.entity{.ts,.js}'],
					synchronize: true,
					dropSchema: true,
				}),
				TypeOrmModule.forFeature([User]),
			],
			providers: [UserService, UserSubscriber],
		}).compile();
		service = module.get<UserService>(UserService);
	});
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('should add new user of role admin', async () => {
		const user: CreateUserDto = {
			firstName: 'jfiore',
			lastName: 'gioeruiogre',
			email: 'amdzad@cc.com',
			password: 'lol',
			phone: 'dehfieure',
		};
		createdUser = await service.create(user, Role.ADMIN);
		expect(createdUser).toBeInstanceOf(User);
		expect(createdUser.role).toEqual(Role.ADMIN);
	});
	it('should not find a user', async () => {
		await service.findOne(-1).catch((error) => {
			expect(error).toBeInstanceOf(NotFoundException);
		});
	});
	it('should update user', async () => {
		const user: UpdateUserDto = {
			password: 'jfiore',
		};
		const result = await service.update(createdUser.id, user);
		expect(result).toEqual({ affected: 1, raw: [], generatedMaps: [] });
	});
	it('should find all users', async () => {
		const users = await service.findAll();
		expect(users).toBeInstanceOf(Array);
		expect(users.length).toEqual(1);
	});
	it('should find one user', async () => {
		const user = await service.findOne(createdUser.id);
		expect(user).toBeInstanceOf(User);
		expect(user.id).toEqual(createdUser.id);
	});
	it('should delete user', async () => {
		const result = await service.remove(createdUser.id);
		expect(result).toEqual({ affected: 1, raw: [] });
	});
});
