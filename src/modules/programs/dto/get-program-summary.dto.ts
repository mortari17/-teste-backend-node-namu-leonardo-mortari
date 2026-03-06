import { ApiProperty } from '@nestjs/swagger';

export class TopParticipant {
  @ApiProperty({ example: 'Ana Silva' })
  user_name: string;

  @ApiProperty({ example: 8 })
  participations: number;
}

export class GetProgramSummaryResponse {
  @ApiProperty({ example: 6 })
  total_activities: number;

  @ApiProperty({ example: 25 })
  total_participations: number;

  @ApiProperty({
    type: [TopParticipant],
  })
  top_participants: TopParticipant[];
}
