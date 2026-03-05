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

@ApiTags('Program')
@Controller('/programs')
export class ProgramController {
  constructor(private programsService: ProgramService) {}

  @Get('/')
  @Documentation({
    title: 'Get list of programs',
    responses: [{ type: ListProgramsResponse }],
  })
  listPrograms(@Query() data: ListProgramsRequest) {
    return this.programsService.listPrograms(data);
  }

  @Get('/:id')
  @Documentation({
    title: 'Get program by id',
    responses: [{ type: GetProgramResponse }],
  })
  getProgram(@Param() { id }: GetProgramRequest) {
    return this.programsService.getProgram(id);
  }

  @Post('/')
  @Documentation({
    title: 'Create a new program',
    responses: [{ type: CreateProgramResponse }],
  })
  createProgram(@Body() data: CreateProgramRequest) {
    return this.programsService.createProgram(data);
  }

  @Put('/:id')
  @Documentation({
    title: 'Update program by id',
    responses: [{ type: UpdateProgramResponse }],
  })
  updateProgram(
    @Param() { id }: UpdateProgramParamRequest,
    @Body() data: UpdateProgramBodyRequest,
  ) {
    return this.programsService.updateProgram(id, data);
  }

  @Delete('/:id')
  @Documentation({
    title: 'Delete program by id',
    responses: [{ type: DeleteProgramResponse }],
  })
  deleteProgram(@Param() { id }: DeleteProgramRequest) {
    return this.programsService.deleteProgram(id);
  }
}
