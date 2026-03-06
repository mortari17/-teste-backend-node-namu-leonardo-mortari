import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EnumDayOfWeek {
  MONDAY = 'segunda',
  TUESDAY = 'terca',
  WEDNESDAY = 'quarta',
  THURSDAY = 'quinta',
  FRIDAY = 'sexta',
  SATURDAY = 'sabado',
  SUNDAY = 'domingo',
}

@Entity('activities')
export class Activity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty()
  @Column('int')
  program_id: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  title: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  description?: string;

  @ApiProperty({ enum: EnumDayOfWeek })
  @Column('enum', { enum: EnumDayOfWeek })
  day_of_week: EnumDayOfWeek;

  @ApiProperty()
  @Column('int')
  duration_minutes: number;
}
