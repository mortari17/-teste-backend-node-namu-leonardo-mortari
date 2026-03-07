import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '@shared/entity/activity.entity';
import { NotFoundException } from '@nestjs/common';

describe('ActivityService', () => {
  let service: ActivityService;
  let activity_repository: jest.Mocked<Repository<Activity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: getRepositoryToken(Activity),
          useValue: {
            findOne: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    activity_repository = module.get(getRepositoryToken(Activity));
  });

  describe('getActivity', () => {
    it('should return activity if found', async () => {
      const activity = { id: 1, title: 'Yoga' } as Activity;

      activity_repository.findOne.mockResolvedValue(activity);

      const result = await service.getActivity(1);

      expect(result).toEqual(activity);
      expect(activity_repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if activity not found', async () => {
      activity_repository.findOne.mockResolvedValue(null);

      await expect(service.getActivity(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateActivity', () => {
    it('should update activity successfully', async () => {
      const activity = {
        id: 1,
        title: 'Yoga',
      } as Activity;

      const update_data = {
        title: 'Pilates',
      };

      const merged = { ...activity, ...update_data } as Activity;

      activity_repository.findOne.mockResolvedValue(activity);
      activity_repository.merge.mockReturnValue(merged);
      activity_repository.save.mockResolvedValue(merged);

      const result = await service.updateActivity(1, update_data);

      expect(result).toEqual(merged);
      expect(activity_repository.merge).toHaveBeenCalledWith(
        activity,
        update_data,
      );
      expect(activity_repository.save).toHaveBeenCalledWith(merged);
    });

    it('should throw NotFoundException if activity does not exist', async () => {
      activity_repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateActivity(1, { title: 'Pilates' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteActivity', () => {
    it('should delete activity successfully', async () => {
      const activity = { id: 1 } as Activity;

      activity_repository.findOne.mockResolvedValue(activity);
      activity_repository.delete.mockResolvedValue({} as any);

      const result = await service.deleteActivity(1);

      expect(result).toEqual({ success: true });
      expect(activity_repository.delete).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException when deleting non-existing activity', async () => {
      activity_repository.findOne.mockResolvedValue(null);

      await expect(service.deleteActivity(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
