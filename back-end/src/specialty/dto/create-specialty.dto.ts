import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecialtyDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;
}
