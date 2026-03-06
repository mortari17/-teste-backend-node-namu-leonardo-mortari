import { DeleteGlobalInfoResponse } from '@shared/utils/global.utils';
import { GetProgramActivityRequest } from './get-program-activity.dto';

export class DeleteProgramActivityRequest extends GetProgramActivityRequest {}

export class DeleteProgramActivityResponse extends DeleteGlobalInfoResponse {}
