import React, { useMemo, useState } from 'react';
import {
  SimpleGrid, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, VStack, Heading, Card,
} from '@chakra-ui/react';
import { OrderCard } from './OrderCard';
import { convertTimestamp } from '../utils/convertTimestamp';

function OrderList({ orders }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const groupedOrders = useMemo(() => {
    const groups = {};
    orders.forEach((order) => {
      const date = convertTimestamp(order.DateComplete, 'dd.MM.yyyy');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
    });
    return groups;
  }, [orders]);

  return (
    <>
      <VStack spacing={8} align="stretch">
        {Object.entries(groupedOrders).map(([date, dateOrders]) => (
          <Box key={date}>
            <Heading size="md" mb={4}>{date}</Heading>
            <SimpleGrid columns={3} spacing={4}>
              {dateOrders.map((order) => (
                <Card
                  key={order.OrderId}
                  p={3}
                  borderWidth={1}
                  borderRadius="md"
                  _hover={{ bg: '#4a2e2e4d.100', cursor: 'pointer' }}
                  onClick={() => handleOrderClick(order)}
                  borderColor="4a2e2e4d"
                >
                  <Text fontWeight="bold" fontSize="smaller">
                    №
                    {order.DeliveryNumber}
                  </Text>
                  <Text fontSize="smaller">
                    {convertTimestamp(order.DateComplete, 'HH:mm')}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Детали заказа №
            {selectedOrder?.DeliveryNumber}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && <OrderCard order={selectedOrder} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { OrderList };
