import React, { useState, useEffect } from 'react';
import {
  Box, Heading, VStack, HStack, Text, Flex, Button,
} from '@chakra-ui/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const { archivedOrders } = useArchivedOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 30;

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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const paginatedOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box p={5} pb={20}>
      <Heading mb={5}>Статистика заказов</Heading>
      <VStack spacing={5} align="stretch">
        <HStack>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd.MM.yyyy"
            locale="ru"
            placeholderText="Выберите начальную дату"
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
            placeholderText="Выберите конечную дату"
          />
        </HStack>
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
        <EarningsDisplay orders={filteredOrders} />
        <OrderList orders={paginatedOrders} />
        <HStack justifyContent="center" mt={4}>
          {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
            <Button key={i} onClick={() => paginate(i + 1)} colorScheme={currentPage === i + 1 ? "blue" : "gray"} size="sm">
              {i + 1}
            </Button>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}

export { OrderStatistics };
