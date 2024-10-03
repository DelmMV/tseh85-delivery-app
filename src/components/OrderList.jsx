import React, { useMemo, useState } from 'react';
import {
  SimpleGrid, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Card,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Badge,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

import { convertTimestamp } from '../utils/convertTimestamp';
import { OrderModal } from './OrderModal';

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
      <Accordion allowMultiple>
        {Object.entries(groupedOrders).map(([date, dateOrders]) => (
          <AccordionItem key={date}>
            <h2>
              <AccordionButton>
                <Flex flex="1" justifyContent="space-between" alignItems="center">
                  <Text>{date}</Text>
                  <Badge colorScheme="green" borderRadius="full" px={2}>
                    {dateOrders.length}
                    {' '}
                    заказов
                  </Badge>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
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
                    <Text fontWeight="bold" fontSize="smaller" align="center">
                      №
                      {order.DeliveryNumber}
                    </Text>
                    <Text fontSize="smaller" display="flex" alignItems="center" justifyContent="center">
                      <TimeIcon boxSize={3} marginRight={1} />
                      {convertTimestamp(order.DateComplete, 'HH:mm')}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Детали заказа №
            {selectedOrder?.DeliveryNumber}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && <OrderModal order={selectedOrder} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { OrderList };
