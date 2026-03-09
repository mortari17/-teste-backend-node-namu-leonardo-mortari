import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnumProgramCategory, Program } from '@modules/programs/entities/program.entity';
import {
  MAX_NAME_LENGTH,
  MIN_DURATION_WEEKS,
  MIN_NAME_LENGTH,
} from '@shared/utils/constants.utils';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProgramRequest {
  @ApiProperty({ example: 'Program Name' })
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  name: string;

  @ApiPropertyOptional({ example: 'Program Description' })
  @IsOptional()
  @IsString()
  @MinLength(MIN_NAME_LENGTH)
  description?: string;

  @ApiProperty({
    enum: EnumProgramCategory,
    example: EnumProgramCategory.EXERCISE,
  })
  @IsEnum(EnumProgramCategory)
  category: EnumProgramCategory;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(MIN_DURATION_WEEKS)
  duration_weeks: number;
}

export class CreateProgramResponse extends Program {}
