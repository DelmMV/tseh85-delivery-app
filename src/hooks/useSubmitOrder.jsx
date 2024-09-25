import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSubmitOrder = () => {
  const queryClient = useQueryClient();

  const submitOrder = async ({
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

  return useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      // Инвалидируем кэш запроса orders после успешного обновления
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error submitting order:', error);
    },
  });
};
