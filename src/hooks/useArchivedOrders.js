import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export function useArchivedOrders() {
  const [allArchivedOrders, setAllArchivedOrders] = useState([]);
  const [currentUserName, setCurrentUserName] = useState('');
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    setCurrentUserName(settings.Name || '');
    const storedOrders = JSON.parse(localStorage.getItem('archivedOrders') || '[]');
    setAllArchivedOrders(storedOrders);
  }, []);

  const updateArchive = useCallback((currentOrders) => {
    const completedOrders = currentOrders.filter((order) => order.Status === 7 && order.CheckoutUserName === currentUserName);

    setAllArchivedOrders((prevArchivedOrders) => {
      const updatedArchivedOrders = [...prevArchivedOrders];

      completedOrders.forEach((order) => {
        if (!updatedArchivedOrders.some((archivedOrder) => archivedOrder.OrderId === order.OrderId)) {
          updatedArchivedOrders.push(order);
        }
      });

      localStorage.setItem('archivedOrders', JSON.stringify(updatedArchivedOrders));
      return updatedArchivedOrders;
    });
  }, [currentUserName]);

  const archivedOrders = useMemo(() => allArchivedOrders.filter((order) => order.CheckoutUserName === currentUserName), [allArchivedOrders, currentUserName]);

  return { archivedOrders, updateArchive };
}
