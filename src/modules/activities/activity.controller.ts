import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Documentation } from '@shared/decorator/documentation.decorator';
import { ActivityService } from './activity.service';
import { DeleteActivityResponse } from './dto/delete-activity.dto';
import {
  GetActivityResponse,
  GetActivityRequest,
} from './dto/get-activity.dto';
import {
  UpdateActivityResponse,
  UpdateActivityParamRequest,
  UpdateActivityBodyRequest,
} from './dto/update-activity.dto';

@ApiTags('Activity')
@Controller('/activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get('/:activity_id')
  @Documentation({
    title: 'Get an activity',
    responses: [{ type: GetActivityResponse }],
  })
  getActivity(@Param() { activity_id }: GetActivityRequest) {
    return this.activityService.getActivity(activity_id);
  }

  @Put('/:activity_id')
  @Documentation({
    title: 'Update an activity',
    responses: [{ type: UpdateActivityResponse }],
  })
  updateActivity(
    @Param() { activity_id }: UpdateActivityParamRequest,
    @Body() data: UpdateActivityBodyRequest,
  ) {
    return this.activityService.updateActivity(activity_id, data);
  }

  @Delete('/:activity_id')
  @Documentation({
    title: 'Delete an activity',
    responses: [{ type: DeleteActivityResponse }],
  })
  deleteActivity(@Param() { activity_id }: UpdateActivityParamRequest) {
    return this.activityService.deleteActivity(activity_id);
  }
}
