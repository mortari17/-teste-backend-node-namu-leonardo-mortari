import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Activity, EnumDayOfWeek } from '@modules/activities/entities/activity.entity';
import {
  MIN_ID,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_DURATION_MINUTUES,
} from '@shared/utils/constants.utils';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  ListGlobalRequest,
  ListGlobalResponse,
} from '@shared/utils/global.utils';

export class ListProgramActivitiesRequest extends ListGlobalRequest {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  id?: number;

  @ApiPropertyOptional({ example: 'Sessão de Meditação Guiada' })
  @IsOptional()
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  title?: string;

  @ApiPropertyOptional({
    enum: EnumDayOfWeek,
    example: EnumDayOfWeek.MONDAY,
  })
  @IsOptional()
  @IsEnum(EnumDayOfWeek)
  day_of_week?: EnumDayOfWeek;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_DURATION_MINUTUES)
  duration_minutes?: number;
}

export class ListProgramActivitiesResponse extends ListGlobalResponse<Activity> {}
