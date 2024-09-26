function cleanLocalStorage(orders) {
  const currentTime = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('order_') || key.startsWith('orderExpanded_')) {
      const orderId = key.split('_')[1];
      const orderExists = orders.some((order) => order.OrderId.toString() === orderId);

      if (!orderExists) {
        localStorage.removeItem(key);
      } else {
        const item = JSON.parse(localStorage.getItem(key));
        if (item && item.timestamp && currentTime - item.timestamp > oneDay) {
          localStorage.removeItem(key);
        }
      }
    }
  });
}

export { cleanLocalStorage };
