import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { Program } from '@shared/entity/program.entity';
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
import { Activity } from '@shared/entity/activity.entity';
import {
  CreateProgramActivityRequest,
  CreateProgramActivityResponse,
} from './dto/create-program-activity.dto';
import {
  ListProgramActivitiesRequest,
  ListProgramActivitiesResponse,
} from './dto/list-program-activities.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
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

    const [data, total] = await this.programRepository.findAndCount({
      where: {
        id,
        name: name ? ILike(`%${name}%`) : undefined,
        category,
        duration_weeks,
        created_at:
          date_start && date_end ? Between(start_date!, end_date!) : undefined,
      },
      order: { created_at: 'DESC' },
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

    const skip: number = (page - 1) * page_size;

    const [data, total] = await this.activityRepository.findAndCount({
      where: {
        id,
        title: title ? ILike(`%${title}%`) : undefined,
        day_of_week,
        duration_minutes,
        program_id,
      },
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
