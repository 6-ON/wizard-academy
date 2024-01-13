import { BaseEntity } from '@/core/base.entity';
import { Salle } from '@/salle/entities/salle.entity';
import { Specialty } from '@/specialty/entities/specialty.entity';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	Relation,
} from 'typeorm';

@Entity()
export class Subject extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@ManyToOne(() => Specialty, (specialty) => specialty.subjects)
	specialty: Relation<Specialty>;

	@ManyToMany(() => Salle, (salle) => salle.subjects)
	@JoinTable({ name: 'subject_salle' })
	salles: Salle[];
	/**
	 * TODO: add relation with professor
	 */
}
