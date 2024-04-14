import React, { useMemo, useEffect, useRef } from 'react';
import { Box, Spinner, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { OrderCard } from '../components/OrderCard';
import { useFilter } from '../contexts/FilterContext';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { useSearch } from '../contexts/SearchContext';
import { useSelectorFilter } from '../contexts/SelectorFilterContext';

function Main() {
  const toast = useToast();
  const {
    data: orders, isLoading, error,
  } = useOrdersQuery();
  const MotionBox = motion(Box);
  const { filter } = useFilter();
  const { searchQuery } = useSearch();
  const { selectorFilter } = useSelectorFilter();
  const prevOrdersLength = useRef(orders?.length);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Ошибка',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }, [error, toast]);
  useEffect(() => {
    if (prevOrdersLength.current < orders?.length) {
      console.log('Новый заказ добавлен');
      // Здесь можно добавить логику для показа локального уведомления
    }
    prevOrdersLength.current = orders?.length;
  }, [orders]);

  const filteredOrders = useMemo(() => orders?.filter((order) => {
    // Проверка на соответствие фильтру по активности
    const isActive = filter === 'active' ? order.Status !== 7 : order.Status === 7;
    if (!isActive) return false;

    // Проверка на соответствие выбранному статусу из SelectorFilter
    let statusMatch = true; // По умолчанию принимаем все заказы, если фильтр не задан
    // Применяем selectorFilter только если не находимся во вкладке "Завершенные"
    if (filter !== 'completed' && selectorFilter) {
      statusMatch = order.Status === Number(selectorFilter);
    }
    // Проверка на соответствие поисковому запросу
    const matchesSearchQuery = Object.values(order).some((val) => {
      const valueAsString = val.toString().toLowerCase();
      return (typeof val === 'string' || typeof val === 'number')
         && valueAsString.includes(searchQuery.toLowerCase());
    });
    return statusMatch && matchesSearchQuery;
  }) || [], [orders, filter, searchQuery, selectorFilter]);

  const MemoizedOrderCard = React.memo(OrderCard);

  return (
    <Box display="flex" justifyContent="space-around" flexDirection="row" flexWrap="wrap" alignItems="center" gap={2} paddingTop="110px" paddingBottom="55px">
      {!isLoading ? filteredOrders.map((order, index) => (
        <MotionBox
          key={`${order.OrderID}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MemoizedOrderCard order={order} />
        </MotionBox>
      )) : <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Spinner size="xl" /></Box>}
    </Box>
  );
}

export { Main };
