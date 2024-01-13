import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigModule } from '@/typeorm-config/typeorm-config.module';
import { TypeormConfigService } from '@/typeorm-config/typeorm-config.service';
import { ConfigModule } from '@nestjs/config';
import { UserSubscriber } from '@/user/entities/user.subscriber';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [TypeormConfigModule],
			extraProviders: [UserSubscriber],
			useExisting: TypeormConfigService,
		}),
		TypeOrmModule.forFeature([]),
	],
	providers: [SeederService],
})
export class SeederModule {}
