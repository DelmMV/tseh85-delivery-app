import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const createAuthorizationError = (message, status) => {
  const error = new Error(message);
  error.name = 'AuthorizationError';
  error.status = status;
  return error;
};

export function useOrdersQuery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const abortController = new AbortController();
  const [timeUntilNextRefetch, setTimeUntilNextRefetch] = useState(30000);

  const acesToken = localStorage.getItem('token');

  const fetchOrders = async () => {
    const response = await fetch('https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0', {
      headers: {
        'Content-Type': 'application/json',
        token: acesToken,
      },
      signal: abortController.signal,
    });

    if (!response.ok) {
      let errorType = 'Ошибка сетевого запроса';
      if (response.status === 401) {
        errorType = 'Не авторизован';
        localStorage.setItem('token', '');
        navigate('/login');
      }
      throw createAuthorizationError(errorType, response.status);
    }
    return response.json();
  };

  return {
    ...useQuery({
      queryKey: ['orders'],
      queryFn: fetchOrders,
      enabled: !!acesToken,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
      retryDelay: 1000,
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        setTimeUntilNextRefetch(30000);
      },
      onSettled: () => abortController.abort(),
    }),
    timeUntilNextRefetch,
  };
}
