import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('participations')
export class Participation {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  user_name: string;

  @ApiProperty()
  @Column('int')
  activity_id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  completed_at: Date;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  notes?: string;
}
