import { UserableEntity } from '@/core/userable.entity';
import { Specialty } from '@/specialty/entities/specialty.entity';
import { University } from '@/university/entities/university.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';

@Entity()
export class Student extends UserableEntity {
	@Column()
	age: number;
	@Column()
	YearOfRegistration: string;
	@ManyToOne(() => University, (university) => university.students)
	university: Relation<University>;
	@ManyToOne(() => Specialty, (speciality) => speciality.students)
	speciality: Specialty;
}
