import { DeleteGlobalInfoResponse } from '@shared/utils/global.utils';
import { GetProgramRequest } from './get-program.dto';

export class DeleteProgramRequest extends GetProgramRequest {}

export class DeleteProgramResponse extends DeleteGlobalInfoResponse {}
