import { format, differenceInMinutes, differenceInHours, differenceInDays, isThisYear } from 'date-fns';

export function formatPostDate(date:Date) {
  const now = new Date();
  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) {
    return 'now';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
//   } else if (days < 7) {
//     return `${days}d`;
  } else {
    return isThisYear(date) ? format(date, 'MMM d') : format(date, 'MMM d, yyyy');
  }
}
