import React, { useState, useEffect } from 'react';
import {
  Text, Input, VStack, HStack,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react';

function EarningsDisplay({ orders }) {
  const [pricePerOrder, setPricePerOrder] = useState(() => localStorage.getItem('pricePerOrder') || '200');
  const [orderCount, setOrderCount] = useState(orders.length.toString());
  const [hoursWorked, setHoursWorked] = useState(() => localStorage.getItem('hoursWorked') || '0');
  const [pricePerHour, setPricePerHour] = useState(() => localStorage.getItem('pricePerHour') || '0');
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    setOrderCount(orders.length.toString());
  }, [orders]);

  useEffect(() => {
    const orderEarnings = (Number(orderCount) || 0) * Number(pricePerOrder);
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
    setOrderCount(e.target.value);
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

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="sm">
                Калькулятор з/п
              </Text>
              <Text fontSize="sm">
                {totalEarnings.toLocaleString()}
                {' '}
                руб.
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Параметр</Th>
                  <Th isNumeric>Значение</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    Цена за заказ -
                    {' '}
                    <Text as="span" color="gray.500">
                      Руб.
                    </Text>
                  </Td>
                  <Td isNumeric>
                    <HStack spacing={2} justifyContent="flex-end">
                      <Input
                        value={pricePerOrder}
                        onChange={handlePriceChange}
                        type="number"
                        width="65px"
                        textAlign="center"
                      />
                    </HStack>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    Количество заказов -
                    {' '}
                    <Text as="span" color="gray.500">
                      Шт.
                    </Text>
                  </Td>
                  <Td isNumeric>
                    <HStack spacing={2} justifyContent="flex-end">
                      <Input
                        value={orderCount}
                        onChange={handleOrderCountChange}
                        type="number"
                        width="65px"
                        textAlign="center"
                      />
                    </HStack>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    Отработанные часы -
                    {' '}
                    <Text as="span" color="gray.500">
                      Часы
                    </Text>
                  </Td>
                  <Td isNumeric>
                    <HStack spacing={2} justifyContent="flex-end">
                      <Input
                        value={hoursWorked}
                        onChange={handleHoursChange}
                        type="number"
                        width="65px"
                        textAlign="center"
                      />
                    </HStack>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    Час работы -
                    {' '}
                    <Text as="span" color="gray.500">
                      Руб./ч.
                    </Text>
                  </Td>
                  <Td isNumeric>
                    <HStack spacing={2} justifyContent="flex-end">
                      <Input
                        value={pricePerHour}
                        onChange={handleHourlyRateChange}
                        type="number"
                        width="65px"
                        textAlign="right"
                      />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <VStack align="stretch" spacing={1} mt={4}>
            <Text fontSize="sm" color="gray.500">
              (За заказы:
              {' '}
              {(orderCount * Number(pricePerOrder)).toLocaleString()}
              {' '}
              руб. +
              За часы:
              {(Number(hoursWorked) * Number(pricePerHour)).toLocaleString()}
              {' '}
              руб.)
            </Text>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export { EarningsDisplay };
