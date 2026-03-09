import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { MIN_ID } from '@shared/utils/constants.utils';
import { Activity } from '@modules/activities/entities/activity.entity';
import { CreateProgramActivityRequest } from '../../programs/dto/create-program-activity.dto';

export class UpdateActivityParamRequest {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  activity_id: number;
}

export class UpdateActivityBodyRequest extends PartialType(
  CreateProgramActivityRequest,
) {}

export class UpdateActivityResponse extends Activity {}
