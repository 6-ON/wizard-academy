import { Test, TestingModule } from '@nestjs/testing';
import { DeanService } from './dean.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dean } from './entities/dean.entity';

describe('DeanService', () => {
	let service: DeanService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5432,
					username: 'postgres',
					password: 'root',
					database: 'wizard_testing',
					entities: ['src/**/*.entity{.ts,.js}'],
					synchronize: true,
					dropSchema: true,
				}),
				TypeOrmModule.forFeature([Dean]),
			],
			providers: [DeanService],
		}).compile();
		service = module.get<DeanService>(DeanService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('should add dean', async () => {
		const createdDean = await service.create({
			user: {
				firstName: 'dhezigie',
				lastName: 'fhzuihfiuhez',
				email: 'fjeiofore@fzef.com',
				password: 'password',
				phone: '+21247042574',
			},
		});
		expect(createdDean).toBeInstanceOf(Dean);
	});
});
