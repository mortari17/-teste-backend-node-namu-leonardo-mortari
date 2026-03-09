import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '@modules/activities/entities/activity.entity';
import { Participation } from '@modules/participations/entities/participation.entity';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';
import { ActivityService } from '@modules/activities/activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participation]),
    TypeOrmModule.forFeature([Activity]),
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService, ActivityService],
})
export class ParticipationModule {}
