import { DeleteGlobalInfoResponse } from '@shared/utils/global.utils';
import { GetParticipationRequest } from './get-participation.dto';

export class DeleteParticipationRequest extends GetParticipationRequest {}

export class DeleteParticipationResponse extends DeleteGlobalInfoResponse {}
