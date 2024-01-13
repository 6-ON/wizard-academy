import { BaseEntity } from '@/core/base.entity';
import { Salle } from '@/salle/entities/salle.entity';
import { Specialty } from '@/specialty/entities/specialty.entity';
import { Column, Entity, JoinTable, ManyToMany, Relation } from 'typeorm';

@Entity()
export class Subject extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@ManyToMany(() => Specialty, (specialty) => specialty.subjects)
	@JoinTable({ name: 'subject_specialty' })
	specialties: Relation<Specialty[]>;

	@ManyToMany(() => Salle, (salle) => salle.subjects)
	@JoinTable({ name: 'subject_salle' })
	salles: Salle[];
	/**
	 * TODO: add relation with professor
	 */
}
