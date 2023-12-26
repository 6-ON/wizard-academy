import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUniversityDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	adress: string;
}
