import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const createAuthorizationError = (message) => new Error(message, { name: 'AuthorizationError', status: 401 });

const fetchOrders = async () => {
  const acesToken = localStorage.getItem('token');
  const response = await fetch('https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0', {
    headers: {
      'Content-Type': 'application/json',
      token: acesToken,
    },
  });

  if (!response.ok) {
    const errorType = response.status === 401 ? 'Unauthorized' : 'Network request failed';
    throw createAuthorizationError(errorType);
  }

  return response.json();
};

export function useOrdersQuery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const acesToken = localStorage.getItem('token');
      const response = await fetch('https://app.tseh85.com/Service/api/delivery/orders?LastUpdateTicks=0', {
        headers: {
          'Content-Type': 'application/json',
          token: acesToken,
        },
      });
      if (response.status === 401) {
        navigate('/login');
      }
      if (!response.ok) {
        const errorType = response.status === 401 ? 'Unauthorized' : 'Network request failed';
        throw createAuthorizationError(errorType);
      }
      return response.json();
    },
    onSuccess: (data) => {
      const previousData = queryClient.getQueryData(['orders']);
      if (previousData && data.length > previousData.length) {
        console.log('New order received');
      }
      queryClient.setQueryData(['orders'], data);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });
}
