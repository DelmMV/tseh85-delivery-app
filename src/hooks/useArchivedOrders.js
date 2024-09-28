import { useState, useEffect, useCallback } from 'react';

export function useArchivedOrders() {
  const [archivedOrders, setArchivedOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('archivedOrders') || '[]');
    setArchivedOrders(storedOrders);
  }, []);

  const updateArchive = useCallback((currentOrders) => {
    const completedOrders = currentOrders.filter((order) => order.Status === 7);

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
