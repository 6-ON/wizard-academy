import { Department } from '@/department/entity/department.entity';
import { Student } from '@/student/entities/student.entity';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Specialty {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	name: string;
	@Column()
	description: string;
	@OneToMany(() => Student, (student) => student.speciality)
	students: Student[];

	@ManyToMany(() => Department)
	@JoinTable({ name: 'specialty_department' })
	departments: Department[];
}
