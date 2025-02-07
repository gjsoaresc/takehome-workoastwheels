import { differenceInDays, differenceInHours } from "date-fns";

export const roundToNearest30Minutes = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 30) * 30;
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    roundedMinutes,
    0,
    0,
  );
};

export function getDiffInDays(startDate: Date, endDate: Date) {
  return {
    differenceInDays: differenceInDays(endDate, startDate),
    differenceInHours: differenceInHours(endDate, startDate),
  };
}
