import React, { useState } from 'react';
import {
  SimpleGrid, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import { OrderCard } from './OrderCard';

function OrderList({ orders }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} spacing={4}>
        {orders.map((order) => (
          <Box
            key={order.OrderId}
            p={3}
            borderWidth={1}
            borderRadius="md"
            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
            onClick={() => handleOrderClick(order)}
          >
            <Text fontWeight="bold" fontSize="smaller">
              №{order.DeliveryNumber}
            </Text>
            <Text fontSize="smaller">
              {order.DateComplete ? new Date(order.DateComplete).toLocaleDateString() : 'Нет данных'}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Детали заказа №{selectedOrder?.DeliveryNumber}</ModalHeader>
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
