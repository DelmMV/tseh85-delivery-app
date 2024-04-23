import { format } from 'date-fns';

export function convertTimestamp(timestamp, formatDate = 'dd.MM.yyyy HH:mm') {
  try {
    const date = new Date(timestamp);
    return format(date, formatDate);
  } catch (e) {
    console.error('Ошибка при конвертировании времени');
    return null;
  }
}
