async function postOrder({
  Status,
  OrderID,
  CancelReasonID,
  Comment,
  WishingDate,
}) {
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
}

export default postOrder;
