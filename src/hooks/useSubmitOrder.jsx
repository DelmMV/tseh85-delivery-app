import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useArchivedOrders } from './useArchivedOrders';

export const useSubmitOrder = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { updateArchive } = useArchivedOrders();

  return useMutation({
    mutationFn: async ({
      Status, OrderID, CancelReasonID, Comment, WishingDate,
    }) => {
      const acesToken = localStorage.getItem('token');
      const response = await fetch('https://app.tseh85.com/Service/api/delivery/order/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: acesToken,
        },
        body: JSON.stringify({
          Status,
          OrderID,
          CancelReasonID,
          Comment,
          WishingDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (variables.Status === 7) {
        const currentOrders = queryClient.getQueryData(['orders']) || [];
        const updatedOrder = { ...currentOrders.find((order) => order.OrderID === variables.OrderID), ...variables };
        updateArchive([...currentOrders, updatedOrder]);
      }
      toast({
        title: 'Заказ обновлен',
        description: 'Статус заказа успешно обновлен',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error('Error submitting order:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус заказа',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
};
