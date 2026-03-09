import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Activity,
  EnumDayOfWeek,
} from '@modules/activities/entities/activity.entity';
import {
  MAX_NAME_LENGTH,
  MIN_DURATION_MINUTUES,
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

export class CreateProgramActivityRequest {
  @ApiProperty({ example: 'Sessão de Meditação Guiada' })
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  title: string;

  @ApiPropertyOptional({
    example: 'Meditação focada na respiração por 20 minutos',
  })
  @IsOptional()
  @IsString()
  @MinLength(MIN_NAME_LENGTH)
  description?: string;

  @ApiProperty({
    enum: EnumDayOfWeek,
    example: EnumDayOfWeek.MONDAY,
  })
  @IsEnum(EnumDayOfWeek)
  day_of_week: EnumDayOfWeek;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(MIN_DURATION_MINUTUES)
  duration_minutes: number;
}

export class CreateProgramActivityResponse extends Activity {}
