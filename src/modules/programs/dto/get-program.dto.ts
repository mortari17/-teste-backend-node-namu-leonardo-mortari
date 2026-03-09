import { ApiProperty } from '@nestjs/swagger';
import { Program } from '@modules/programs/entities/program.entity';
import { MIN_ID } from '@shared/utils/constants.utils';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetProgramRequest {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(MIN_ID)
  program_id: number;
}

export class GetProgramResponse extends Program {}
