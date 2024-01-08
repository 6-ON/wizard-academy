import { BaseEntity } from '@/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Subject extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;
	/**
	 * @todo add Salle relation
	 */
}
