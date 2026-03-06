import { DeleteGlobalInfoResponse } from '@shared/utils/global.utils';
import { GetActivityRequest } from './get-activity.dto';

export class DeleteActivityRequest extends GetActivityRequest {}

export class DeleteActivityResponse extends DeleteGlobalInfoResponse {}
