import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UniversityModule } from './university/university.module';

@Module({
	imports: [AuthModule, UniversityModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
