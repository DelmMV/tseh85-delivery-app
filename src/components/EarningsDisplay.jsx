import React, { useState, useEffect } from 'react';
import {
  Box, Text, Input, VStack, HStack, Divider, Button,
} from '@chakra-ui/react';

function EarningsDisplay({ orders }) {
  const [pricePerOrder, setPricePerOrder] = useState(() => localStorage.getItem('pricePerOrder') || '200');
  const [orderCount, setOrderCount] = useState(orders.length);
  const [hoursWorked, setHoursWorked] = useState(() => localStorage.getItem('hoursWorked') || '0');
  const [pricePerHour, setPricePerHour] = useState(() => localStorage.getItem('pricePerHour') || '0');
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    setOrderCount(orders.length);
  }, [orders]);

  useEffect(() => {
    const orderEarnings = orderCount * Number(pricePerOrder);
    const hourlyEarnings = Number(hoursWorked) * Number(pricePerHour);
    const total = orderEarnings + hourlyEarnings;
    setTotalEarnings(total);
  }, [orderCount, pricePerOrder, hoursWorked, pricePerHour]);

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPricePerOrder(newPrice);
    localStorage.setItem('pricePerOrder', newPrice);
  };

  const handleOrderCountChange = (e) => {
    setOrderCount(Number(e.target.value));
  };

  const handleHoursChange = (e) => {
    const newHours = e.target.value;
    setHoursWorked(newHours);
    localStorage.setItem('hoursWorked', newHours);
  };

  const handleHourlyRateChange = (e) => {
    const newRate = e.target.value;
    setPricePerHour(newRate);
    localStorage.setItem('pricePerHour', newRate);
  };

  const adjustHours = (amount) => {
    const newHours = Math.max(0, Number(hoursWorked) + amount);
    setHoursWorked(newHours.toString());
    localStorage.setItem('hoursWorked', newHours.toString());
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
        <HStack justify="space-between">
          <Text>Количество заказов:</Text>
          <Input
            value={orderCount}
            onChange={handleOrderCountChange}
            type="number"
            width="100px"
          />
        </HStack>
        <VStack align="stretch">
          <HStack justify="space-between">
            <Text>Часы работы:</Text>
            <Input
              value={hoursWorked}
              onChange={handleHoursChange}
              type="number"
              width="100px"
            />
            <Text>ч.</Text>
          </HStack>
          <HStack justify="flex-end">
            <Button size="sm" onClick={() => adjustHours(-12)}>-12</Button>
            <Button size="sm" onClick={() => adjustHours(-1)}>-1</Button>
            <Button size="sm" onClick={() => adjustHours(1)}>+1</Button>
            <Button size="sm" onClick={() => adjustHours(12)}>+12</Button>
          </HStack>
        </VStack>
        <HStack justify="space-between">
          <Text>Цена за час работы:</Text>
          <Input
            value={pricePerHour}
            onChange={handleHourlyRateChange}
            type="number"
            width="100px"
          />
          <Text>руб./ч</Text>
        </HStack>
        <Divider />
        <Text fontWeight="bold" fontSize="xl">
          Общий заработок:
          {totalEarnings}
          {' '}
          руб.
        </Text>
        <Text fontSize="sm" color="gray.500">
          (За заказы:
          {' '}
          {orderCount * Number(pricePerOrder)}
          {' '}
          руб. + За часы:
          {Number(hoursWorked) * Number(pricePerHour)}
          {' '}
          руб.)
        </Text>
      </VStack>
    </Box>
  );
}

export { EarningsDisplay };
