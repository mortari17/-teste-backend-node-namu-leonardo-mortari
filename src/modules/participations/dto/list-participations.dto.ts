import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Participation } from '@shared/entity/participation.entity';
import { MIN_ID } from '@shared/utils/constants.utils';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
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
