import React, { useState, useEffect } from 'react';
import {
  Box, Heading, VStack, HStack, Text, Flex, Button, Card, Center,
} from '@chakra-ui/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { useArchivedOrders } from '../hooks/useArchivedOrders';
import { OrderList } from '../components/OrderList';
import { EarningsDisplay } from '../components/EarningsDisplay';

// Регистрируем русскую локаль
registerLocale('ru', ru);

function OrderStatistics() {
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  });
  const [chartData, setChartData] = useState([]);
  const { archivedOrders } = useArchivedOrders();

  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const filtered = archivedOrders.filter((order) => {
      const orderDate = new Date(order.DateComplete);
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      return orderDate >= startOfDay && orderDate <= endOfDay;
    });
    setFilteredOrders(filtered);

    const orderCounts = {};
    filtered.forEach((order) => {
      const date = new Date(order.DateComplete).toISOString().split('T')[0];
      orderCounts[date] = (orderCounts[date] || 0) + 1;
    });

    const sortedDates = Object.keys(orderCounts).sort();
    const newChartData = sortedDates.map((date) => ({
      date,
      orders: orderCounts[date],
    }));

    setChartData(newChartData);
  }, [archivedOrders, startDate, endDate]);

  const datePickerCustomStyles = {
    input: {
      width: '110px',
      fontSize: '14px',
      padding: '4px 8px',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
    },
  };

  return (
    <Box p={5} pb={20}>
      <Heading mb={5} align="center">Статистика заказов</Heading>
      <VStack spacing={5} align="stretch">
        <Card p={3}>
          <Center>
            <HStack spacing={2}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                placeholderText="Начало"
                customInput={<input style={datePickerCustomStyles.input} />}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                placeholderText="Конец"
                customInput={<input style={datePickerCustomStyles.input} />}
              />
            </HStack>
          </Center>
        </Card>
        <Box height="150px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box p={1}>
          <Flex justify="space-between">
            <Text fontWeight="bold">
              Всего заказов:
              {' '}
              {filteredOrders.length}
            </Text>
            <Text fontWeight="bold">
              Средний заказ в день:
              {' '}
              {(filteredOrders.length / chartData.length || 1).toFixed(0)}
            </Text>
          </Flex>
        </Box>
        <EarningsDisplay orders={filteredOrders} />
        <OrderList orders={filteredOrders} />
      </VStack>
    </Box>
  );
}

export { OrderStatistics };
