import { ApiProperty } from '@nestjs/swagger';
import { Participation } from '@modules/participations/entities/participation.entity';
import { MIN_ID } from '@shared/utils/constants.utils';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetParticipationRequest {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  participation_id: number;
}

export class GetParticipationResponse extends Participation {}
