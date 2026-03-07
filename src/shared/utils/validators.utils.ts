import { BadRequestException } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';

export function validateStartAndEndDates(
  date_start?: string,
  date_end?: string,
): { date_start_time?: Date; date_end_time?: Date } {
  if ((date_start && !date_end) || (!date_start && date_end)) {
    throw new BadRequestException(
      'Both date_start and date_end must be provided together',
    );
  }

  let date_start_time,
    date_end_time: Date | undefined = undefined;

  if (date_start && date_end) {
    date_start_time = startOfDay(new Date(date_start));
    date_end_time = endOfDay(new Date(date_end));

    if (date_start_time > date_end_time) {
      throw new BadRequestException('date_start must be before date_end');
    }
  }

  return { date_start_time, date_end_time };
}
