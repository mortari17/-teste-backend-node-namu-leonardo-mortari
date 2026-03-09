import { PartialType } from '@nestjs/swagger';
import { CreateProgramRequest } from './create-program.dto';
import { Program } from '@modules/programs/entities/program.entity';
import { GetProgramRequest } from './get-program.dto';

export class UpdateProgramParamRequest extends GetProgramRequest {}

export class UpdateProgramBodyRequest extends PartialType(
  CreateProgramRequest,
) {}

export class UpdateProgramResponse extends Program {}
