import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '@shared/entity/activity.entity';
import { Repository } from 'typeorm';
import { GetActivityResponse } from './dto/get-activity.dto';
import {
  UpdateActivityBodyRequest,
  UpdateActivityResponse,
} from './dto/update-activity.dto';
import { DeleteActivityResponse } from './dto/delete-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async getActivity(id: number): Promise<GetActivityResponse> {
    const activity = await this.activityRepository.findOne({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return activity;
  }

  async updateActivity(
    id: number,
    data: UpdateActivityBodyRequest,
  ): Promise<UpdateActivityResponse> {
    const activity = await this.getActivity(id);

    const updated = this.activityRepository.merge(activity, data);

    return await this.activityRepository.save(updated);
  }

  async deleteActivity(id: number): Promise<DeleteActivityResponse> {
    await this.getActivity(id);

    await this.activityRepository.delete({ id });

    return { success: true };
  }
}
