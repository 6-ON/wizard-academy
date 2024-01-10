import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { UpdateSubjectDto } from './dto/update-subject.dto';

describe('SubjectService', () => {
	let service: SubjectService;
	let subject: Subject;
	beforeAll(async () => {
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
				TypeOrmModule.forFeature([Subject]),
			],
			providers: [SubjectService],
		}).compile();

		service = module.get<SubjectService>(SubjectService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('should add subject', async () => {
		subject = await service.create({
			name: 'subject',
			description: 'description',
		});
		expect(subject).toBeInstanceOf(Subject);
	});

	it('should find all subjects', async () => {
		const subjects = await service.findAll();
		expect(subjects).toBeInstanceOf(Array);
		expect(subjects).toHaveLength(1);
		expect(subjects.find((s) => s.id === subject.id)).toEqual(subject);
	});

	it('should find one subject', async () => {
		const foundSubject = await service.findOne(subject.id);
		expect(foundSubject).toBeInstanceOf(Subject);
		expect(foundSubject).toEqual(subject);
	});

	it('should update subject', async () => {
		const payload: UpdateSubjectDto = {
			description: 'new description',
		};
		subject = await service.update(subject.id, payload);
		expect(subject).toBeInstanceOf(Subject);
		expect(subject.description).toEqual(payload.description);
	});
});
