import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Создаем функцию для генерации ошибки авторизации
const createAuthorizationError = (message) => {
  const error = new Error(message);
  error.name = 'AuthorizationError';
  error.status = 401;
  return error;
};

// Функция для выполнения запроса
const fetchOrders = async () => {
  const acesToken = localStorage.getItem('token');
  const response = await fetch('https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      token: acesToken,
    },
  });

  if (!response.ok) {
    throw response.status === 401 ? createAuthorizationError('Unauthorized') : new Error('Сетевой запрос не удался');
  }

  return response.json();
};

export function useOrdersQuery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    onError: (err) => {
      // Проверяем, является ли ошибка экземпляром Error и имеет ли она свойство status
      if (err instanceof Error && 'status' in err && err.status === 401) {
        navigate('/login'); // Перенаправляем на страницу логина
      } else {
        // Обрабатываем другие типы ошибок
        console.error('Произошла ошибка при запросе заказов:', err);
      }
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
