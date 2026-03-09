import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '@modules/programs/entities/program.entity';
import { Activity } from '@modules/activities/entities/activity.entity';
import { Participation } from '@modules/participations/entities/participation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program]),
    TypeOrmModule.forFeature([Activity]),
    TypeOrmModule.forFeature([Participation]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
