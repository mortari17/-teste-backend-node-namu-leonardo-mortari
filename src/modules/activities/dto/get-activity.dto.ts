import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@shared/entity/activity.entity';
import { MIN_ID } from '@shared/utils/constants.utils';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetActivityRequest {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  activity_id: number;
}

export class GetActivityResponse extends Activity {}
