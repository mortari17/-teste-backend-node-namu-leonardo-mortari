import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { MIN_ID } from '@shared/utils/constants.utils';
import { Activity } from '@shared/entity/activity.entity';
import { CreateProgramActivityRequest } from './create-program-activity.dto';

export class UpdateProgramActivityParamRequest {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  activity_id: number;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  program_id: number;
}

export class UpdateProgramActivityBodyRequest extends PartialType(
  CreateProgramActivityRequest,
) {}

export class UpdateProgramActivityResponse extends Activity {}
