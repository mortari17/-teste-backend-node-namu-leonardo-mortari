import { Program } from '@shared/entity/program.entity';
import { GetGlobalInfoRequest } from '@shared/utils/global.utils';

export class GetProgramRequest extends GetGlobalInfoRequest {}

export class GetProgramResponse extends Program {}
