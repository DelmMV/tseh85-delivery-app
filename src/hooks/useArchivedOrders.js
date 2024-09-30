import { useState, useEffect, useCallback } from 'react';

export function useArchivedOrders() {
  const [archivedOrders, setArchivedOrders] = useState([]);
  const currentUserName = JSON.parse(localStorage.getItem('settings'))?.Name;
  const storedOrders = JSON.parse(localStorage.getItem('archivedOrders') || '[]');
  useEffect(() => {
    const userArchivedOrders = storedOrders.filter((order) => order.CheckoutUserName === currentUserName);
    setArchivedOrders(userArchivedOrders);
  }, []);

  const updateArchive = useCallback((currentOrders) => {
    const currentUserName = JSON.parse(localStorage.getItem('settings'))?.Name;
    const completedOrders = currentOrders.filter((order) => order.Status === 7 && order.CheckoutUserName === currentUserName);

    setArchivedOrders((prevArchivedOrders) => {
      const updatedArchivedOrders = [...prevArchivedOrders];

      completedOrders.forEach((order) => {
        if (!updatedArchivedOrders.some((archivedOrder) => archivedOrder.OrderId === order.OrderId)) {
          updatedArchivedOrders.push(order);
        }
      });

      localStorage.setItem('archivedOrders', JSON.stringify(updatedArchivedOrders));
      return updatedArchivedOrders;
    });
  }, []);

  return { archivedOrders, updateArchive };
}
