import { Box, Spinner, useToast } from '@chakra-ui/react';
import React, {
  useEffect, useMemo, useCallback,
} from 'react';
import { OrderCard } from '../components/OrderCard';
import { useFilter } from '../contexts/FilterContext';
import { useSearch } from '../contexts/SearchContext';
import { useSelectorFilter } from '../contexts/SelectorFilterContext';
import { useOrdersQuery } from '../hooks/useOrdersQuery';


function Main() {
  const toast = useToast();
  const { data: orders, isLoading, error } = useOrdersQuery();
  const { filter } = useFilter();
  const { searchQuery } = useSearch();
  const { selectorFilter } = useSelectorFilter();

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

  const filterOrders = useCallback((orderList) => orderList.filter((order) => {
    const isActive = filter === 'active' ? order.Status !== 7 : order.Status === 7;
    if (!isActive) return false;
    let statusMatch = true;
    if (filter !== 'completed' && selectorFilter) {
      statusMatch = order.Status === Number(selectorFilter);
    }

    const matchesSearchQuery = Object.values(order).some((val) => {
      const valueAsString = val.toString().toLowerCase();
      return (typeof val === 'string' || typeof val === 'number') && valueAsString.includes(searchQuery.toLowerCase());
    });

    return statusMatch && matchesSearchQuery;
  }), [filter, searchQuery, selectorFilter]);

  const filteredOrders = useMemo(() => filterOrders(orders || []), [orders, filterOrders]);
  const MemoizedOrderCard = React.memo(OrderCard);

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      gap={2}
      paddingTop="110px"
      paddingBottom="55px"
    >
      {!isLoading ? (
        filteredOrders.map((order) => (
          <MemoizedOrderCard order={order} key={order.OrderID} />
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      )}
    </Box>
  );
}

export { Main };
