import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { Participation } from '@shared/entity/participation.entity';
import { Activity } from '@shared/entity/activity.entity';
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

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
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
    const activity = await this.activityRepository.findOne({
      where: { id: data.activity_id },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    const participation = this.participationRepository.create(data);

    return this.participationRepository.save(participation);
  }

  async updateParticipation(
    id: number,
    data: UpdateParticipationBodyRequest,
  ): Promise<UpdateParticipationResponse> {
    const participation = await this.participationRepository.findOne({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

    const updated = this.participationRepository.merge(participation, data);

    return await this.participationRepository.save(updated);
  }

  async deleteParticipation(id: number): Promise<DeleteParticipationResponse> {
    const participation = await this.participationRepository.findOne({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

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

    if ((date_start && !date_end) || (!date_start && date_end)) {
      throw new BadRequestException(
        'Both date_start and date_end must be provided together',
      );
    }

    let start_date: Date | undefined = undefined,
      end_date: Date | undefined = undefined;

    if (date_start && date_end) {
      start_date = startOfDay(new Date(date_start));
      end_date = endOfDay(new Date(date_end));

      if (start_date > end_date) {
        throw new BadRequestException('date_start must be before date_end');
      }
    }

    const [data, total] = await this.participationRepository.findAndCount({
      where: {
        id,
        user_name: user_name ? ILike(`%${user_name}%`) : undefined,
        activity_id,
        completed_at:
          date_start && date_end ? Between(start_date!, end_date!) : undefined,
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
