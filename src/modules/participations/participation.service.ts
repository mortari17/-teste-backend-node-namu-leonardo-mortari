import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Participation } from '@shared/entity/participation.entity';
import { GetParticipationResponse } from './dto/get-participation.dto';
import {
  CreateParticipationRequest,
  CreateParticipationResponse,
} from './dto/create-participation.dto';
import {
  UpdateParticipationBodyRequest,
  UpdateParticipationResponse,
} from './dto/update-participation.dto';
import { DeleteParticipationResponse } from './dto/delete-participation.dto';
import {
  ListParticipationsRequest,
  ListParticipationsResponse,
} from './dto/list-participations.dto';
import { ActivityService } from '@modules/activities/activity.service';
import { validateStartAndEndDates } from '@shared/utils/validators.utils';

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
    private activityService: ActivityService,
  ) {}

  async getParticipation(id: number): Promise<GetParticipationResponse> {
    const participation = await this.participationRepository.findOne({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

    return participation;
  }

  async createParticipation(
    data: CreateParticipationRequest,
  ): Promise<CreateParticipationResponse> {
    await this.activityService.getActivity(data.activity_id);

    const participation = this.participationRepository.create(data);

    return this.participationRepository.save(participation);
  }

  async updateParticipation(
    id: number,
    data: UpdateParticipationBodyRequest,
  ): Promise<UpdateParticipationResponse> {
    const participation = await this.getParticipation(id);

    const updated = this.participationRepository.merge(participation, data);

    return await this.participationRepository.save(updated);
  }

  async deleteParticipation(id: number): Promise<DeleteParticipationResponse> {
    await this.getParticipation(id);

    await this.participationRepository.delete({ id });

    return { success: true };
  }

  async listParticipations(
    filters: ListParticipationsRequest,
  ): Promise<ListParticipationsResponse> {
    const {
      page,
      page_size,
      activity_id,
      user_name,
      id,
      date_end,
      date_start,
    } = filters;

    const skip: number = (page - 1) * page_size;

    const { date_start_time, date_end_time } = validateStartAndEndDates(
      date_start,
      date_end,
    );

    const [data, total] = await this.participationRepository.findAndCount({
      where: {
        id,
        user_name: user_name ? ILike(`%${user_name}%`) : undefined,
        activity_id,
        completed_at:
          date_start && date_end
            ? Between(date_start_time!, date_end_time!)
            : undefined,
      },
      order: { completed_at: 'DESC' },
      take: page_size,
      skip,
    });

    return {
      data,
      page: filters.page,
      page_size: filters.page_size,
      total,
    };
  }
}
