import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Activity } from './activity.entity';

export enum EnumProgramCategory {
  MEDITATION = 'meditacao',
  EXERCISE = 'exercicio',
  NUTRITION = 'nutricao',
}

@Entity('programs')
export class Program {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  name: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  description?: string;

  @ApiProperty({ enum: EnumProgramCategory })
  @Column('enum', { enum: EnumProgramCategory })
  category: EnumProgramCategory;

  @ApiProperty()
  @Column('int')
  duration_weeks: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Activity, (activity) => activity.program)
  activities: Activity[];
}
