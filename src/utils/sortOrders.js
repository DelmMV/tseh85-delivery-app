import { parseISO, startOfHour, format } from 'date-fns';

export function sortOrders(orders) {
  const nearest = [];
  const timed = {};
  const newOrders = [];

  const parseDate = (dateValue) => {
    if (dateValue instanceof Date) return dateValue;
    if (typeof dateValue === 'string') {
      try {
        return parseISO(dateValue);
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    }
    return new Date(); // fallback to current date
  };

  orders.forEach(order => {
    if (order.Status === 12) {
      newOrders.push(order);
    } else if (order.Nearest) {
      nearest.push(order);
    } else {
      const wishingDate = parseDate(order.WishingDate);
      const hourStart = startOfHour(wishingDate);
      const hourKey = format(hourStart, 'yyyy-MM-dd HH:00');

      if (!timed[hourKey]) {
        timed[hourKey] = [];
      }
      timed[hourKey].push(order);
    }
  });

  // Сортируем каждую группу по времени
  const sortByWishingDate = (a, b) => {
    const dateA = parseDate(a.WishingDate);
    const dateB = parseDate(b.WishingDate);
    return dateA.getTime() - dateB.getTime();
  };

  nearest.sort(sortByWishingDate);
  Object.keys(timed).forEach(key => {
    timed[key].sort(sortByWishingDate);
  });
  newOrders.sort((a, b) => {
    const dateA = parseDate(a.DateOrder);
    const dateB = parseDate(b.DateOrder);
    return dateB.getTime() - dateA.getTime();
  });

  return { nearest, timed, newOrders };
}
