import { Test, TestingModule } from '@nestjs/testing';
import { ProgramService } from './program.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '@modules/programs/entities/program.entity';
import { Activity } from '@modules/activities/entities/activity.entity';
import { Participation } from '@modules/participations/entities/participation.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProgramService', () => {
  let service: ProgramService;

  let program_repository: jest.Mocked<Repository<Program>>;
  let activity_repository: jest.Mocked<Repository<Activity>>;
  let participation_repository: jest.Mocked<Repository<Participation>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramService,
        {
          provide: getRepositoryToken(Program),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Activity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Participation),
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProgramService>(ProgramService);
    program_repository = module.get(getRepositoryToken(Program));
    activity_repository = module.get(getRepositoryToken(Activity));
    participation_repository = module.get(getRepositoryToken(Participation));
  });

  describe('getProgram', () => {
    it('should return program if found', async () => {
      const program = { id: 1, name: 'Yoga' } as Program;

      program_repository.findOne.mockResolvedValue(program);

      const result = await service.getProgram(1);

      expect(result).toEqual(program);
      expect(program_repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if program not found', async () => {
      program_repository.findOne.mockResolvedValue(null);

      await expect(service.getProgram(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProgram', () => {
    it('should update program successfully', async () => {
      const program = {
        id: 1,
        name: 'Yoga',
        category: 'exercicio',
        duration_weeks: 4,
      } as Program;

      const update_data = {
        name: 'Pilates',
      };

      const merged = { ...program, ...update_data } as Program;

      program_repository.findOne.mockResolvedValue(program);
      program_repository.merge.mockReturnValue(merged);
      program_repository.save.mockResolvedValue(merged);

      const result = await service.updateProgram(1, update_data);

      expect(result).toEqual(merged);
      expect(program_repository.merge).toHaveBeenCalledWith(
        program,
        update_data,
      );
      expect(program_repository.save).toHaveBeenCalledWith(merged);
    });
  });

  describe('createProgram', () => {
    it('should create and save program', async () => {
      const data = {
        name: 'Yoga',
        category: 'exercicio',
        duration_weeks: 4,
      } as any;

      const created = { ...data } as Program;
      const saved = { id: 1, ...data } as Program;

      program_repository.create.mockReturnValue(created);
      program_repository.save.mockResolvedValue(saved);

      const result = await service.createProgram(data);

      expect(result).toEqual(saved);
      expect(program_repository.create).toHaveBeenCalledWith(data);
      expect(program_repository.save).toHaveBeenCalledWith(created);
    });
  });

  describe('deleteProgram', () => {
    it('should delete program successfully', async () => {
      const program = { id: 1 } as Program;

      program_repository.findOne.mockResolvedValue(program);
      program_repository.delete.mockResolvedValue({} as any);

      const result = await service.deleteProgram(1);

      expect(result).toEqual({ success: true });
      expect(program_repository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('getProgramSummary', () => {
    it('should return summary data', async () => {
      const program = { id: 1 } as Program;

      program_repository.findOne.mockResolvedValue(program);
      activity_repository.count.mockResolvedValue(3);

      const count_query_builder = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(10),
      };

      const ranking_query_builder = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { user_name: 'Ana', participations: '5' },
          { user_name: 'João', participations: '3' },
        ]),
      };

      (participation_repository.createQueryBuilder as jest.Mock)
        .mockReturnValueOnce(count_query_builder)
        .mockReturnValueOnce(ranking_query_builder);

      const result = await service.getProgramSummary(1);

      expect(result.total_activities).toBe(3);
      expect(result.total_participations).toBe(10);
      expect(result.top_participants[0]).toEqual({
        user_name: 'Ana',
        participations: 5,
      });
    });
  });
});
