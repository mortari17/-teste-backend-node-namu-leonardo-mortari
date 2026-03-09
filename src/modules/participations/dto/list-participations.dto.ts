import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Participation } from '@modules/participations/entities/participation.entity';
import {
  MAX_NAME_LENGTH,
  MIN_ID,
  MIN_NAME_LENGTH,
} from '@shared/utils/constants.utils';
import {
  IsDateString,
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

export class ListParticipationsRequest extends ListGlobalRequest {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  id?: number;

  @ApiPropertyOptional({ example: 'Ana Silva' })
  @IsOptional()
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  user_name?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  activity_id?: number;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  date_start?: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  date_end?: string;
}

export class ListParticipationsResponse extends ListGlobalResponse<Participation> {}
