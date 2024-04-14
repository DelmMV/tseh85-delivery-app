import { useQuery } from '@tanstack/react-query';
// const response = await fetch('http://192.168.1.101:3001/purchases', {
//   method: 'GET', // Явное указание метода
// });
export function useOrderQuery(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      try {
        const response = await fetch(`https://app.tseh85.com/Service/api/delivery/purchases?OrderID=${id}`, {
          method: 'GET', // Явное указание метода GET
          headers: {
            'content-type': 'application/json',
            token: '4Mm9jOfrue15Roj/Ghltdwp7TMqjDyxS+0ScGZ2GQYEeaTBpbTX7p5MZUUkT8oNA',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        // В реальном приложении здесь может быть более сложная логика обработки ошибок
        throw new Error(`Failed to fetch order data: ${error.message}`);
      }
    },
    // Пример настройки параметров
    staleTime: 5 * 60 * 1000, // Данные остаются "свежими" 5 минут
    cacheTime: 30 * 60 * 1000, // Кэшированные данные удаляются через 30 минут неактивности
    retry: 1, // Попытка повторного запроса один раз в случае неудачи
  });
}
