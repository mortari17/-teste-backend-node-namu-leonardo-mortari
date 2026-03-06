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
import { ParticipationService } from './participation.service';
import {
  ListParticipationsRequest,
  ListParticipationsResponse,
} from './dto/list-participations.dto';
import {
  CreateParticipationRequest,
  CreateParticipationResponse,
} from './dto/create-participation.dto';
import {
  GetParticipationRequest,
  GetParticipationResponse,
} from './dto/get-participation.dto';
import {
  UpdateParticipationBodyRequest,
  UpdateParticipationParamRequest,
  UpdateParticipationResponse,
} from './dto/update-participation.dto';
import {
  DeleteParticipationRequest,
  DeleteParticipationResponse,
} from './dto/delete-participation.dto';

@ApiTags('Participation')
@Controller('/participations')
export class ParticipationController {
  constructor(private participationService: ParticipationService) {}

  @Get()
  @Documentation({
    title: 'Get list of participations',
    responses: [{ type: ListParticipationsResponse }],
  })
  listParticipations(@Query() data: ListParticipationsRequest) {
    return this.participationService.listParticipations(data);
  }

  @Get('/:participation_id')
  @Documentation({
    title: 'Get participation by id',
    responses: [{ type: GetParticipationResponse }],
  })
  getParticipation(@Param() { participation_id }: GetParticipationRequest) {
    return this.participationService.getParticipation(participation_id);
  }

  @Post()
  @Documentation({
    title: 'Create a new participation',
    responses: [{ type: CreateParticipationResponse }],
  })
  createParticipation(@Body() data: CreateParticipationRequest) {
    return this.participationService.createParticipation(data);
  }

  @Put('/:participation_id')
  @Documentation({
    title: 'Update participation by id',
    responses: [{ type: UpdateParticipationResponse }],
  })
  updateParticipation(
    @Param() { participation_id }: UpdateParticipationParamRequest,
    @Body() data: UpdateParticipationBodyRequest,
  ) {
    return this.participationService.updateParticipation(
      participation_id,
      data,
    );
  }

  @Delete(':participation_id')
  @Documentation({
    title: 'Delete participation by id',
    responses: [{ type: DeleteParticipationResponse }],
  })
  deleteParticipation(
    @Param() { participation_id }: DeleteParticipationRequest,
  ) {
    return this.participationService.deleteParticipation(participation_id);
  }
}
