import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyService } from './specialty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Student } from '@/student/entities/student.entity';

describe('SpecialtyService', () => {
	let service: SpecialtyService;

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
				TypeOrmModule.forFeature([Specialty, Student]),
			],
			providers: [SpecialtyService],
		}).compile();

		service = module.get<SpecialtyService>(SpecialtyService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('Should add new specialty', async () => {
		const specialty = await service.create({
			name: 'test',
			description: 'test',
		});
		expect(specialty).toBeInstanceOf(Specialty);
	});
});
