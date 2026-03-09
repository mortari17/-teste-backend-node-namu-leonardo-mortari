import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProgramResponse } from './dto/get-program.dto';
import {
  ListProgramsRequest,
  ListProgramsResponse,
} from './dto/list-programs.dto';
import {
  CreateProgramRequest,
  CreateProgramResponse,
} from './dto/create-program.dto';
import {
  UpdateProgramBodyRequest,
  UpdateProgramResponse,
} from './dto/update-program.dto';
import { DeleteProgramResponse } from './dto/delete-program.dto';
import { Activity } from '@modules/activities/entities/activity.entity';
import {
  CreateProgramActivityRequest,
  CreateProgramActivityResponse,
} from './dto/create-program-activity.dto';
import {
  ListProgramActivitiesRequest,
  ListProgramActivitiesResponse,
} from './dto/list-program-activities.dto';
import { GetProgramSummaryResponse } from './dto/get-program-summary.dto';
import {
  getSkipForPagination,
  useAsDateInterval,
  useAsIlike,
  validateStartAndEndDates,
} from '@shared/utils/helpers.utils';
import { Program } from './entities/program.entity';
import { Participation } from '@modules/participations/entities/participation.entity';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
  ) {}

  async getProgram(id: number): Promise<GetProgramResponse> {
    const program = await this.programRepository.findOne({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  async createProgram(
    data: CreateProgramRequest,
  ): Promise<CreateProgramResponse> {
    const program = this.programRepository.create(data);

    return this.programRepository.save(program);
  }

  async updateProgram(
    id: number,
    data: UpdateProgramBodyRequest,
  ): Promise<UpdateProgramResponse> {
    const program = await this.getProgram(id);

    const updated = this.programRepository.merge(program, data);

    return await this.programRepository.save(updated);
  }

  async deleteProgram(id: number): Promise<DeleteProgramResponse> {
    await this.getProgram(id);

    await this.programRepository.delete({ id });

    return { success: true };
  }

  async listPrograms(
    filters: ListProgramsRequest,
  ): Promise<ListProgramsResponse> {
    const {
      page,
      page_size,
      category,
      duration_weeks,
      name,
      id,
      date_end,
      date_start,
    } = filters;

    const { date_start_time, date_end_time } = validateStartAndEndDates(
      date_start,
      date_end,
    );

    const skip = getSkipForPagination(page, page_size);

    const [data, total] = await this.programRepository.findAndCount({
      where: {
        id,
        name: useAsIlike(name),
        category,
        duration_weeks,
        created_at: useAsDateInterval(
          date_start,
          date_end,
          date_start_time,
          date_end_time,
        ),
      },
      order: { created_at: 'DESC' },
      take: page_size,
      skip,
    });

    return {
      data,
      page,
      page_size,
      total,
    };
  }

  async createProgramActivity(
    program_id: number,
    data: CreateProgramActivityRequest,
  ): Promise<CreateProgramActivityResponse> {
    await this.getProgram(program_id);

    const activity = this.activityRepository.create({
      program_id,
      ...data,
    });

    return this.activityRepository.save(activity);
  }

  async listProgramActivities(
    program_id: number,
    filters: ListProgramActivitiesRequest,
  ): Promise<ListProgramActivitiesResponse> {
    const { page, page_size, id, day_of_week, duration_minutes, title } =
      filters;

    const skip = getSkipForPagination(page, page_size);

    const [data, total] = await this.activityRepository.findAndCount({
      where: {
        id,
        title: useAsIlike(title),
        day_of_week,
        duration_minutes,
        program_id,
      },
      take: page_size,
      skip,
    });

    return {
      data,
      page,
      page_size,
      total,
    };
  }

  async getProgramSummary(
    program_id: number,
  ): Promise<GetProgramSummaryResponse> {
    await this.getProgram(program_id);

    const total_activities = await this.activityRepository.count({
      where: { program_id },
    });

    const total_participations = await this.participationRepository
      .createQueryBuilder('p')
      .innerJoin(Activity, 'a', 'a.id = p.activity_id')
      .where('a.program_id = :program_id', { program_id })
      .getCount();

    const TOP_PARTICIPANTS_LIMIT = 5;

    const top_participants = await this.participationRepository
      .createQueryBuilder('p')
      .select('p.user_name', 'user_name')
      .addSelect('COUNT(*)', 'participations')
      .innerJoin(Activity, 'a', 'a.id = p.activity_id')
      .where('a.program_id = :program_id', { program_id })
      .groupBy('p.user_name')
      .orderBy('participations', 'DESC')
      .limit(TOP_PARTICIPANTS_LIMIT)
      .getRawMany();

    return {
      total_activities,
      total_participations,
      top_participants: top_participants.map((p) => ({
        user_name: String(p.user_name),
        participations: Number(p.participations),
      })),
    };
  }
}
