import React, { useState, useEffect } from 'react';
import {
  Card, Text, Input, VStack, HStack, Divider, Button,
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
    <Card borderWidth={1} borderRadius="lg" p={6} borderColor="#4a2e2e4d">
      <VStack align="stretch" spacing={5}>
        <HStack justify="space-between">
          <Text fontWeight="medium">Цена за заказ:</Text>
          <HStack spacing={2}>
            <Input
              value={pricePerOrder}
              onChange={handlePriceChange}
              type="number"
              width="80px"
              textAlign="right"
            />
            <Text width="40px">руб.</Text>
          </HStack>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="medium">Количество заказов:</Text>
          <Input
            value={orderCount}
            onChange={handleOrderCountChange}
            type="number"
            width="80px"
            textAlign="right"
          />
					<Text width="30px">шт.</Text>
        </HStack>
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <Text fontWeight="medium">Часы работы:</Text>
            <HStack spacing={2}>
              <Input
                value={hoursWorked}
                onChange={handleHoursChange}
                type="number"
                width="80px"
                textAlign="right"
              />
              <Text width="30px">ч.</Text>
            </HStack>
          </HStack>
          <HStack justify="flex-end" spacing={2}>
            <Button size="sm" onClick={() => adjustHours(-12)}>-12</Button>
            <Button size="sm" onClick={() => adjustHours(-1)}>-1</Button>
            <Button size="sm" onClick={() => adjustHours(1)}>+1</Button>
            <Button size="sm" onClick={() => adjustHours(12)}>+12</Button>
          </HStack>
        </VStack>
        <HStack justify="space-between">
          <Text fontWeight="medium">Цена за час работы:</Text>
          <HStack spacing={2}>
            <Input
              value={pricePerHour}
              onChange={handleHourlyRateChange}
              type="number"
              width="80px"
              textAlign="right"
            />
            <Text width="50px">руб./ч</Text>
          </HStack>
        </HStack>
        <Divider />
        <VStack align="stretch" spacing={1}>
          <Text fontWeight="bold" fontSize="xl">
            Общий заработок: {totalEarnings.toLocaleString()} руб.
          </Text>
          <Text fontSize="sm" color="gray.500">
            (За заказы: {(orderCount * Number(pricePerOrder)).toLocaleString()} руб. + 
            За часы: {(Number(hoursWorked) * Number(pricePerHour)).toLocaleString()} руб.)
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}

export { EarningsDisplay };
