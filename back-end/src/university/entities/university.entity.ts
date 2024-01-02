import { User } from '@/user/entities/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
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
}
