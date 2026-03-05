import { PartialType } from '@nestjs/swagger';
import { CreateProgramRequest } from './create-program.dto';
import { GetGlobalInfoRequest } from '@shared/utils/global.utils';
import { Program } from '@shared/entity/program.entity';

export class UpdateProgramParamRequest extends GetGlobalInfoRequest {}

export class UpdateProgramBodyRequest extends PartialType(
  CreateProgramRequest,
) {}

export class UpdateProgramResponse extends Program {}
