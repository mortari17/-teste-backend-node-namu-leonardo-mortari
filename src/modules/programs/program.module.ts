import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '@shared/entity/program.entity';
import { Activity } from '@shared/entity/activity.entity';
import { Participation } from '@shared/entity/participation.entity';

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
