import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  EnumProgramCategory,
  Program,
} from '@modules/programs/entities/program.entity';
import {
  MAX_NAME_LENGTH,
  MIN_DURATION_WEEKS,
  MIN_ID,
  MIN_NAME_LENGTH,
} from '@shared/utils/constants.utils';
import {
  IsDateString,
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

export class ListProgramsRequest extends ListGlobalRequest {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  id?: number;

  @ApiPropertyOptional({ example: 'Mindfulness para Iniciantes' })
  @IsOptional()
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  name?: string;

  @ApiPropertyOptional({
    enum: EnumProgramCategory,
    example: EnumProgramCategory.EXERCISE,
  })
  @IsOptional()
  @IsEnum(EnumProgramCategory)
  category?: EnumProgramCategory;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_DURATION_WEEKS)
  duration_weeks?: number;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  date_start?: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  date_end?: string;
}

export class ListProgramsResponse extends ListGlobalResponse<Program> {}
