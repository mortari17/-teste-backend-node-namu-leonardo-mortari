import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Documentation } from '@shared/decorator/documentation.decorator';
import {
  CreateProgramRequest,
  CreateProgramResponse,
} from './dto/create-program.dto';
import {
  ListProgramsRequest,
  ListProgramsResponse,
} from './dto/list-programs.dto';
import { GetProgramRequest, GetProgramResponse } from './dto/get-program.dto';
import {
  UpdateProgramBodyRequest,
  UpdateProgramParamRequest,
  UpdateProgramResponse,
} from './dto/update-program.dto';
import {
  DeleteProgramRequest,
  DeleteProgramResponse,
} from './dto/delete-program.dto';
import { ProgramService } from './program.service';
import {
  ListProgramActivitiesRequest,
  ListProgramActivitiesResponse,
} from './dto/list-program-activities.dto';
import {
  CreateProgramActivityRequest,
  CreateProgramActivityResponse,
} from './dto/create-program-activity.dto';
import {
  GetProgramActivityRequest,
  GetProgramActivityResponse,
} from './dto/get-program-activity.dto';
import {
  UpdateProgramActivityBodyRequest,
  UpdateProgramActivityParamRequest,
  UpdateProgramActivityResponse,
} from './dto/update-program-activity.dto';
import { DeleteProgramActivityResponse } from './dto/delete-program-activity.dto';

@ApiTags('Program')
@Controller('/programs')
export class ProgramController {
  constructor(private programsService: ProgramService) {}

  @Get()
  @Documentation({
    title: 'Get list of programs',
    responses: [{ type: ListProgramsResponse }],
  })
  listPrograms(@Query() data: ListProgramsRequest) {
    return this.programsService.listPrograms(data);
  }

  @Get('/:program_id')
  @Documentation({
    title: 'Get program by id',
    responses: [{ type: GetProgramResponse }],
  })
  getProgram(@Param() { program_id }: GetProgramRequest) {
    return this.programsService.getProgram(program_id);
  }

  @Post()
  @Documentation({
    title: 'Create a new program',
    responses: [{ type: CreateProgramResponse }],
  })
  createProgram(@Body() data: CreateProgramRequest) {
    return this.programsService.createProgram(data);
  }

  @Put('/:program_id')
  @Documentation({
    title: 'Update program by id',
    responses: [{ type: UpdateProgramResponse }],
  })
  updateProgram(
    @Param() { program_id }: UpdateProgramParamRequest,
    @Body() data: UpdateProgramBodyRequest,
  ) {
    return this.programsService.updateProgram(program_id, data);
  }

  @Delete(':program_id')
  @Documentation({
    title: 'Delete program by id',
    responses: [{ type: DeleteProgramResponse }],
  })
  deleteProgram(@Param() { program_id }: DeleteProgramRequest) {
    return this.programsService.deleteProgram(program_id);
  }

  @Get('/:program_id/activities')
  @Documentation({
    title: 'Get list of activities for a program',
    responses: [{ type: ListProgramActivitiesResponse }],
  })
  listProgramActivities(
    @Param() { program_id }: GetProgramRequest,
    @Query() data: ListProgramActivitiesRequest,
  ) {
    return this.programsService.listProgramActivities(program_id, data);
  }

  @Get('/:program_id/activities/:activity_id')
  @Documentation({
    title: 'Get an activity of a program',
    responses: [{ type: GetProgramActivityResponse }],
  })
  getProgramActivity(
    @Param() { program_id, activity_id }: GetProgramActivityRequest,
  ) {
    return this.programsService.getProgramActivity(program_id, activity_id);
  }

  @Post('/:program_id/activities')
  @Documentation({
    title: 'Create a new activity for a program',
    responses: [{ type: CreateProgramActivityResponse }],
  })
  createProgramActivity(
    @Param() { program_id }: GetProgramRequest,
    @Body() data: CreateProgramActivityRequest,
  ) {
    return this.programsService.createProgramActivity(program_id, data);
  }

  @Put('/:program_id/activities/:activity_id')
  @Documentation({
    title: 'Update an activity for a program',
    responses: [{ type: UpdateProgramActivityResponse }],
  })
  updateProgramActivity(
    @Param() { program_id, activity_id }: UpdateProgramActivityParamRequest,
    @Body() data: UpdateProgramActivityBodyRequest,
  ) {
    return this.programsService.updateProgramActivity(
      program_id,
      activity_id,
      data,
    );
  }

  @Delete('/:program_id/activities/:activity_id')
  @Documentation({
    title: 'Delete an activity for a program',
    responses: [{ type: DeleteProgramActivityResponse }],
  })
  deleteProgramActivity(
    @Param() { program_id, activity_id }: UpdateProgramActivityParamRequest,
  ) {
    return this.programsService.deleteProgramActivity(program_id, activity_id);
  }
}
