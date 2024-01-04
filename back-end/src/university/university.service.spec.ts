import { Test, TestingModule } from '@nestjs/testing';
import { UniversityService } from './university.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';

describe('UniversityService', () => {
	let service: UniversityService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: 'postgres',
					host: 'localhost',
					port: 5432,
					username: 'postgres',
					password: '123456',
					logging: true,
					logger: 'file',
					database: 'TestWizard',
					entities: ['src/**/*.entity{.ts,.js}'],
					synchronize: true,
					// dropSchema: true,
				}),
				TypeOrmModule.forFeature([University, User]),
			],
			providers: [UniversityService, UserService],
		}).compile();

		service = module.get<UniversityService>(UniversityService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('should add new university', async () => {
		const university: CreateUniversityDto = {
			name: 'jfiore',
			adress: 'gioeruiogre',
			deanId: 4,
		};
		const createdUniversity = await service.create(university);
		expect(createdUniversity).toBeInstanceOf(University);
	});
	it('should find all universities', async () => {
		const universities = await service.findAll();
		expect(universities).toBeInstanceOf(Array);
	});
	it('should find one university', async () => {
		const university = await service.findOne(1);
		expect(university).toBeInstanceOf(University);
	});
	it('Should update university', async () => {
		const university = await service.update(1, {
			name: 'test',
			adress: 'trst',
		});
		expect(university).toBeInstanceOf(University);
	});

	it('should delete university', async () => {
		await expect(async () => await service.remove(1)).rejects.toThrow();
	});
});
