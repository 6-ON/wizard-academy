import { JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '../user/entities/user.entity';

export abstract class UserableEntity extends BaseEntity {
	@OneToOne(() => User, {
		nullable: false,
		cascade: true,
		eager: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: User;
}
