import {
	IsEmail,
	IsEmpty,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
} from 'class-validator';
import { Role } from '../roles';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@IsEmpty()
	role: Role;
}
