import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@shared/entity/activity.entity';
import { MIN_ID } from '@shared/utils/constants.utils';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetProgramActivityRequest {
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

export class GetProgramActivityResponse extends Activity {}
