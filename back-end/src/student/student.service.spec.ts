import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from '@/university/entities/university.entity';
import { User } from '@/user/entities/user.entity';
import { Role } from '@/user/roles';
import { UserService } from '@/user/user.service';
import { Student } from './entities/student.entity';
import { UniversityService } from '@/university/university.service';

describe('StudentService', () => {
	let service: StudentService;

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
				TypeOrmModule.forFeature([Student, User, University]),
			],
			providers: [StudentService, UserService, UniversityService],
		}).compile();

		service = module.get<StudentService>(StudentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	it('Should add new student', async () => {
		const student = await service.create({
			YearOfRegistration: '2024-01-02T15:32:28.410Z',
			age: 12,
			universityId: 1,
			user: {
				password: '123456',
				firstName: 'firstName',
				lastName: 'lastName',
				phone: '+212637171341',
				email: 'example@email.com',
				role: Role.STUDENT,
			},
		});
		expect(student).toBeInstanceOf(Student);
	});
	it('Should find all students', async () => {
		const students = await service.findAll();
		expect(students).toBeInstanceOf(Array);
	});
	it('Should find one student', async () => {
		const student = await service.findOne(1);
		expect(student).toBeInstanceOf(Student);
	});
	it('Should update student', async () => {
		const student = await service.update(1, {
			age: 20,
			YearOfRegistration: '2024-01-02T15:32:28.410Z',
			user: {
				password: '123456',
				firstName: 'oussama',
				lastName: 'lastName',
				phone: '+212637171341',
				email: 'example@email.com',
				role: Role.STUDENT,
			},
		});
		expect(student).toBeInstanceOf(Student);
	});
});
