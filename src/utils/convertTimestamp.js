import { format } from 'date-fns';

export function convertTimestamp(timestamp, formatDate = 'dd.MM.yyyy HH:mm') {
  try {
    if (!timestamp) {
      return null;
    }
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      // eslint-disable-next-line no-console
      console.warn('Некорректный timestamp:', timestamp);
      return null;
    }
    return format(date, formatDate);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при конвертировании времени:', e);
    return null;
  }
}
