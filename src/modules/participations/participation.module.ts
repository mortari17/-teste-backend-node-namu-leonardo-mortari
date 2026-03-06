import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '@shared/entity/activity.entity';
import { Participation } from '@shared/entity/participation.entity';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participation]),
    TypeOrmModule.forFeature([Activity]),
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule {}
