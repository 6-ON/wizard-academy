import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { University } from '../entities/university.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UniversityOwnerGuard implements CanActivate {
	constructor(
		@InjectRepository(University)
		private universityRepository: Repository<University>,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const userId = request.user.id;
		const universityId = request.params.id;
		const foundSubject = await this.universityRepository.findOneBy({
			id: universityId,
			dean: { id: userId },
		});
		if (!foundSubject) throw new ForbiddenException();
		return true;
	}
}
