import { isDateString, matches } from 'class-validator';

export function transformDate(dayStart: string, timeStart: string) {
  const validDateStart = isDateString(dayStart);
  const validTimeStart = matches(
    timeStart,
    /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/,
  );

  if (!validDateStart || !validTimeStart) {
    throw new Error('Date or time not valid');
  }
  const [hour, minute] = timeStart.split(':').map(Number);
  const [year, month, day] = dayStart.split('-').map(Number);
  const newDate = new Date(year, month - 1, day, hour, minute);
  if (isNaN(newDate.getTime())) {
    throw new Error('Invalid date or time format');
  }
  return newDate;
}
