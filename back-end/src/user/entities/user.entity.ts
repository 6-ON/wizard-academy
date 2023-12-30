import { BaseEntity } from '@/core/base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../roles';

@Entity()
export class User extends BaseEntity {
	@Column()
	firstName: string;
	@Column()
	lastName: string;
	@Column()
	email: string;
	@Column({ select: true })
	password: string;
	@Column()
	phone: string;
	@Column({ type: 'enum', enum: Role, enumName: 'roles' })
	role: Role;
}
