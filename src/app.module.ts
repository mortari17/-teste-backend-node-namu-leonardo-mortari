import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from '@modules/programs/program.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeorm_config } from '@config/typeorm.config';
import { ParticipationModule } from '@modules/participations/participation.module';
import { ActivityModule } from '@modules/activities/activity.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeorm_config),
    ProgramModule,
    TerminusModule,
    ParticipationModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
