import { NestFactory } from '@nestjs/core';
import { SeederModule } from '@/seeder/seeder.module';
import { SeederService } from '@/seeder/seeder.service';

async function bootstrap() {
	const seeder = await NestFactory.create(SeederModule);
	const seederService = seeder.get(SeederService);
	seederService.seed();
}

bootstrap();
