import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Dean } from '@/dean/entities/dean.entity';
import { User } from '@/user/entities/user.entity';
import { Role } from '@/user/roles';
import { Student } from '@/student/entities/student.entity';
import { University } from '@/university/entities/university.entity';
import { Specialty } from '@/specialty/entities/specialty.entity';
import { Subject } from '@/subject/entities/subject.entity';
// import { Department } from '@/department/entity/department.entity';
@Injectable()
export class SeederService {
	constructor(private dataSource: DataSource) {}
	async seed() {
		console.log('Seeding...');
		await this.admin();
		const deans = await this.deans();
		const universities = await this.universities(deans);
		const subjects = await this.subjects();
		const specialities = await this.specialties(subjects);
		await this.students(universities, specialities);
		console.log('Seeding complete.');
	}
	admin() {
		console.log('Seeding admin...');
		const userRepo = this.dataSource.getRepository(User);
		return userRepo.save({
			role: Role.ADMIN,
			email: 'admin@mail.com',
			password: 'password',
			firstName: 'Admin',
			lastName: 'Admin',
			phone: '+212600000000',
		});
	}
	async deans(count: number = 10) {
		console.log('Seeding deans...');
		const deanRepo = this.dataSource.getRepository(Dean);
		const deans = Array.from({ length: count }).map(() =>
			deanRepo.create({
				user: {
					role: Role.DEAN,
					email: faker.internet.email(),
					password: 'password',
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					phone: faker.string.numeric('+2126########'),
				},
			}),
		);
		return deanRepo.save(deans);
	}
	specialties(subjects: Subject[]) {
		console.log('Seeding specialties...');

		const specialtyRepo = this.dataSource.getRepository(Specialty);
		const specialties = Array.from({ length: 10 }).map(() => {
			// pick random subjects
			const randomSubjects = this.pickRandom(subjects);
			return specialtyRepo.create({
				name: faker.commerce.product(),
				description: faker.commerce.productDescription(),
				subjects: randomSubjects,
			});
		});
		return specialtyRepo.save(specialties);
	}
	private pickRandom<T>(items: T[]) {
		const subjectsCount = faker.number.int({ min: 1, max: items.length });
		return Array.from({ length: subjectsCount }).map(
			() => items[faker.number.int({ min: 0, max: items.length - 1 })],
		);
	}

	// departments(university: University) {
	// 	console.log('Seeding departments...');
	// 	const departmentRepo = this.dataSource.getRepository(Department);
	// 	const departments = Array.from({ length: 10 }).map(() =>
	// 		departmentRepo.create({
	// 			name: faker.commerce.department(),
	// 			university,
	// 		}),
	// 	);
	// 	return departmentRepo.save(departments);
	// }

	universities(deans: Dean[]) {
		console.log('Seeding universities...');
		const universityRepo = this.dataSource.getRepository(University);
		const universities = Array.from({ length: deans.length }).map((_, i) =>
			universityRepo.create({
				name: faker.company.name(),
				adress: faker.location.streetAddress(),
				dean: deans[i].user,
			}),
		);
		return universityRepo.save(universities);
	}

	students(universities: University[], specialities: Specialty[]) {
		console.log('Seeding students...');
		const studentRepo = this.dataSource.getRepository(Student);
		const students = Array.from({ length: universities.length * 10 }).map(
			(_, i) =>
				studentRepo.create({
					speciality:
						specialities[
							faker.number.int({ min: 0, max: specialities.length - 1 })
						],
					age: faker.number.int({ min: 18, max: 25 }),
					YearOfRegistration: faker.date
						.past({ years: 5 })
						.getFullYear()
						.toString(),
					university: universities[Math.floor(i / 10)],
					user: {
						role: Role.STUDENT,
						email: faker.internet.email(),
						password: 'password',
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						phone: faker.phone.number(),
					},
				}),
		);
		return studentRepo.save(students);
	}
	subjects(count: number = 50) {
		console.log('Seeding subjects...');
		const subjectRepo = this.dataSource.getRepository(Subject);
		const subjects = Array.from({ length: count }).map(() =>
			subjectRepo.create({
				name: faker.commerce.productAdjective(),
				description: faker.commerce.productDescription(),
			}),
		);
		return subjectRepo.save(subjects);
	}
}
