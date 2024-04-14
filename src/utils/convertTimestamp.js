import { format } from 'date-fns';

export function convertTimestamp(timestamp) {
  const date = new Date(timestamp);
  return format(date, 'HH:mm');
}
