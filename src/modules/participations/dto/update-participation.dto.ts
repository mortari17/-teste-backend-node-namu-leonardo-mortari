import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateParticipationRequest } from './create-participation.dto';
import { Participation } from '@modules/participations/entities/participation.entity';
import { GetParticipationRequest } from './get-participation.dto';

export class UpdateParticipationParamRequest extends GetParticipationRequest {}

export class UpdateParticipationBodyRequest extends PartialType(
  OmitType(CreateParticipationRequest, ['activity_id'] as const),
) {}

export class UpdateParticipationResponse extends Participation {}
