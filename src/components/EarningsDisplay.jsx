import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button, VStack, HStack } from '@chakra-ui/react';

function EarningsDisplay({ orders }) {
  const [pricePerOrder, setPricePerOrder] = useState(() => {
    return localStorage.getItem('pricePerOrder') || '200';
  });
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const earnings = orders.length * Number(pricePerOrder);
    setTotalEarnings(earnings);
  }, [orders, pricePerOrder]);

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPricePerOrder(newPrice);
    localStorage.setItem('pricePerOrder', newPrice);
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Text>Цена за заказ:</Text>
          <Input
            value={pricePerOrder}
            onChange={handlePriceChange}
            type="number"
            width="100px"
          />
          <Text>руб.</Text>
        </HStack>
        <Text fontWeight="bold" fontSize="xl">
          Общий заработок: {totalEarnings} руб.
        </Text>
      </VStack>
    </Box>
  );
}

export { EarningsDisplay };
