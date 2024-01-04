import { Student } from '@/student/entities/student.entity';
import { User } from '@/user/entities/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class University {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	adress: string;
	@JoinColumn()
	@OneToOne(() => User)
	dean: User;

	@OneToMany(() => Student, (student) => student.university)
	students: Student[];
}
