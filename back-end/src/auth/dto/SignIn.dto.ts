import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	ValidateIf,
} from 'class-validator';

export class SignInDto {
	@IsNotEmpty()
	@IsEmail()
	@ValidateIf((o) => !o.phone)
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsPhoneNumber()
	@ValidateIf((o) => !o.email)
	phone: string;
}
