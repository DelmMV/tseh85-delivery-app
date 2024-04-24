export function status(s) {
  switch (s) {
    case 12:
      return { label: 'Новый', color: 'yellow.300' };
    case 7:
      return { label: 'Получен', color: 'gray' };
    case 5:
      return { label: 'Подтвержден', color: 'blue.500' };
    case 6:
      return { label: 'На доставке', color: 'green' };
    default:
      return { label: 'null', color: 'gray' };
  }
}
