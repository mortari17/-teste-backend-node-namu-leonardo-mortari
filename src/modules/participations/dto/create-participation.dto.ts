import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Participation } from '@shared/entity/participation.entity';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { MIN_ID } from '@shared/utils/constants.utils';

export class CreateParticipationRequest {
  @ApiProperty({ example: 'Ana Silva' })
  @IsString()
  user_name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(MIN_ID)
  activity_id: number;

  @ApiPropertyOptional({ example: 'Sessão muito produtiva' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateParticipationResponse extends Participation {}
