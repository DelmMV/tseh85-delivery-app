import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  const postOrder = async ({
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
  };

  return useMutation(postOrder, {
    onSuccess: () => {
      // Инвалидируем кэш запросов после успешной отправки
      queryClient.invalidateQueries('orders');
    },
    onError: (error) => {
      // Обработка ошибок
      // eslint-disable-next-line no-console
      console.error('Error submitting order:', error);
    },
  });
};
