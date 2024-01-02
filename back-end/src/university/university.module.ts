import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { UserModule } from '@/user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([University]), UserModule],
	controllers: [UniversityController],
	providers: [UniversityService],
})
export class UniversityModule {}
