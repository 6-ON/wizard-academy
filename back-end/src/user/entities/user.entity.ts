import { BaseEntity } from '@/core/base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../roles';

@Entity()
export class User extends BaseEntity {
	@Column()
	firstName: string;
	@Column()
	lastName: string;
	@Column({ unique: true })
	email: string;
	@Column({ select: false })
	password: string;
	@Column({ unique: true })
	phone: string;
	@Column({ type: 'enum', enum: Role, enumName: 'roles' })
	role: Role;
}
