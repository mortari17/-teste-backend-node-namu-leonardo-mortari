import { PartialType } from '@nestjs/swagger';
import { CreateParticipationRequest } from './create-participation.dto';
import { Participation } from '@shared/entity/participation.entity';
import { GetParticipationRequest } from './get-participation.dto';

export class UpdateParticipationParamRequest extends GetParticipationRequest {}

export class UpdateParticipationBodyRequest extends PartialType(
  CreateParticipationRequest,
) {}

export class UpdateParticipationResponse extends Participation {}
