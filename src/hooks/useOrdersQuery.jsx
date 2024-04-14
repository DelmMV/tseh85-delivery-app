import { useQuery, useQueryClient } from '@tanstack/react-query';
// https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0
// headers: {
//   'content-type': 'application/json',
//       token: '4Mm9jOfrue15Roj/Ghltdwp7TMqjDyxS+0ScGZ2GQYEeaTBpbTX7p5MZUUkT8oNA',
// },

async function fetchOrders() {
  const response = await fetch('https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0', {
    method: 'GET', // Явное указание метода GET
    headers: {
      'content-type': 'application/json',
      token: '4Mm9jOfrue15Roj/Ghltdwp7TMqjDyxS+0ScGZ2GQYEeaTBpbTX7p5MZUUkT8oNA',
    },
  });
  if (!response.ok) {
    throw new Error('Сетевой запрос не удался');
  }
  return response.json();
}

export function useOrdersQuery() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    onError: (err) => {
      if (err instanceof Error) {
        return Error;
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000, // Кэшированные данные удаляются через 30 минут неактивности
    retry: 1,
    retryDelay: 1000,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    onSuccess: (newData) => {
      // Получаем предыдущие данные из кеша
      const previousData = queryClient.getQueryData(['orders']);
      // Сравниваем предыдущие данные с новыми
      if (previousData && newData.length > previousData.length) {
        console.log('Новый заказ получен');
        // Здесь можно добавить логику для показа уведомления
      }
      // Обновляем кеш с новыми данными
      queryClient.setQueryData(['orders'], newData);
    },
  });
}
