function cleanLocalStorage(orders) {
  // Получаем имя текущего пользователя из настроек
  const currentUserName = JSON.parse(localStorage.getItem('settings'))?.Name;

  // Фильтруем заказы, оставляя только те, которые принадлежат текущему пользователю
  const userOrders = orders.filter((order) => order.CheckoutUserName === currentUserName);

  // Сохраняем отфильтрованные заказы
  localStorage.setItem('currentOrders', JSON.stringify(userOrders));

  const currentTime = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('order_') || key.startsWith('orderExpanded_') || key.startsWith('isExpanded_')) {
      const orderId = key.split('_')[1];
      const orderExists = userOrders.some((order) => order.OrderId.toString() === orderId || order.DeliveryNumber.toString() === orderId);

      if (!orderExists) {
        localStorage.removeItem(key);
      } else if (key.startsWith('order_')) {
        const item = JSON.parse(localStorage.getItem(key));
        if (item && item.timestamp && currentTime - item.timestamp > oneDay) {
          localStorage.removeItem(key);
        }
      }
    }
  });
}

export { cleanLocalStorage };
