import React from 'react';
import {
  SimpleGrid, Box, Text, Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function OrderList({ orders }) {
  return (
    <SimpleGrid columns={3} spacing={4}>
      {orders.map((order) => {
        const orderId = order.OrderId || order.id || order._id || 'Нет данных';
        return (
          <Link
            as={RouterLink}
            to={`/order/${orderId}`}
            key={orderId}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            <Box p={3} borderWidth={1} borderRadius="md" _hover={{ bg: 'gray.100' }}>
              <Text fontWeight="bold" fontSize="smaller">
                №
                {orderId}
              </Text>
              <Text fontSize="smaller">
                {order.DateComplete ? new Date(order.DateComplete).toLocaleDateString() : 'Нет данных'}
              </Text>
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
}

export { OrderList };
