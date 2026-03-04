import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EnumProgramCategory {
  MEDITATION = 'meditação',
  EXERCISE = 'exercício',
  NUTRITION = 'nutrição',
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
}
