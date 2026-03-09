import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Participation } from '@modules/participations/entities/participation.entity';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';
import {
  MAX_NAME_LENGTH,
  MIN_ID,
  MIN_NAME_LENGTH,
} from '@shared/utils/constants.utils';

export class CreateParticipationRequest {
  @ApiProperty({ example: 'Ana Silva' })
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  user_name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(MIN_ID)
  activity_id: number;

  @ApiPropertyOptional({ example: 'Sessão muito produtiva' })
  @IsOptional()
  @IsString()
  @MinLength(MIN_NAME_LENGTH)
  notes?: string;
}

export class CreateParticipationResponse extends Participation {}
