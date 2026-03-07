import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationService } from './participation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from '@shared/entity/participation.entity';
import { ActivityService } from '@modules/activities/activity.service';
import { NotFoundException } from '@nestjs/common';

describe('ParticipationService', () => {
  let service: ParticipationService;

  let participation_repository: jest.Mocked<Repository<Participation>>;
  let activity_service: jest.Mocked<ActivityService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationService,
        {
          provide: getRepositoryToken(Participation),
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
          provide: ActivityService,
          useValue: {
            getActivity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ParticipationService>(ParticipationService);
    participation_repository = module.get(getRepositoryToken(Participation));
    activity_service = module.get(ActivityService);
  });

  describe('getParticipation', () => {
    it('should return participation if found', async () => {
      const participation = { id: 1, user_name: 'Ana' } as Participation;

      participation_repository.findOne.mockResolvedValue(participation);

      const result = await service.getParticipation(1);

      expect(result).toEqual(participation);
      expect(participation_repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if participation not found', async () => {
      participation_repository.findOne.mockResolvedValue(null);

      await expect(service.getParticipation(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateParticipation', () => {
    it('should update participation successfully', async () => {
      const participation = {
        id: 1,
        user_name: 'Ana',
        activity_id: 10,
      } as any;

      const update_data = {
        user_name: 'Maria',
      };

      const merged = {
        ...participation,
        ...update_data,
      };

      participation_repository.findOne.mockResolvedValue(participation);
      participation_repository.merge.mockReturnValue(merged);
      participation_repository.save.mockResolvedValue(merged);

      const result = await service.updateParticipation(1, update_data);

      expect(result).toEqual(merged);
      expect(participation_repository.merge).toHaveBeenCalledWith(
        participation,
        update_data,
      );
      expect(participation_repository.save).toHaveBeenCalledWith(merged);
    });
  });

  describe('createParticipation', () => {
    it('should create participation when activity exists', async () => {
      const data = {
        user_name: 'Ana',
        activity_id: 1,
      } as any;

      const created = { ...data } as Participation;
      const saved = { id: 1, ...data } as Participation;

      activity_service.getActivity.mockResolvedValue({ id: 1 } as any);
      participation_repository.create.mockReturnValue(created);
      participation_repository.save.mockResolvedValue(saved);

      const result = await service.createParticipation(data);

      expect(result).toEqual(saved);
      expect(activity_service.getActivity).toHaveBeenCalledWith(1);
      expect(participation_repository.create).toHaveBeenCalledWith(data);
      expect(participation_repository.save).toHaveBeenCalledWith(created);
    });
  });

  describe('deleteParticipation', () => {
    it('should delete participation successfully', async () => {
      const participation = { id: 1 } as Participation;

      participation_repository.findOne.mockResolvedValue(participation);
      participation_repository.delete.mockResolvedValue({} as any);

      const result = await service.deleteParticipation(1);

      expect(result).toEqual({ success: true });
      expect(participation_repository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('listParticipations', () => {
    it('should return paginated participations', async () => {
      const filters = {
        page: 1,
        page_size: 10,
      } as any;

      const participations = [{ id: 1, user_name: 'Ana' }] as Participation[];

      participation_repository.findAndCount.mockResolvedValue([
        participations,
        1,
      ]);

      const result = await service.listParticipations(filters);

      expect(result.data).toEqual(participations);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.page_size).toBe(10);
    });
  });
});
