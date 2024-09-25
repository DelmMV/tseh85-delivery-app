import React, { useCallback, useState, memo } from 'react';
import {
  Box, Button, Collapse, useDisclosure, Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useOrderQuery } from '../hooks/useOrderQuery';
import OrderContent from './OrderContent';
import { useSubmitOrder } from '../hooks/useSubmitOrder';

function OpenOrder({
  QuantityPurchases,
  Price,
  OrderId,
  Status,
}) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { data: getOrder, isLoading, isError } = useOrderQuery(OrderId, { enabled: isOpen });
  const [selectedItems, setSelectedItems] = useState({});
  const handleCheckboxChange = useCallback((itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  }, []);

  const isAllSelected = getOrder && getOrder.every((item) => selectedItems[item.RowId]);

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;
    return <OrderContent getOrder={getOrder} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} />;
  };

  const { mutate: submitOrder, isLoading: isSubmitting } = useSubmitOrder();

  const handlePostOrder = async () => {
    try {
      await submitOrder({
        Status: 5, // Статус "Подтвержден"
        OrderID: OrderId,
        CancelReasonID: 1,
        Comment: '',
        WishingDate: null,
      });
      // Обновление UI будет происходить автоматически после инвалидации кэша
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handlePostOrderCheckout = async () => {
    try {
      await submitOrder({
        Status: 7, // Статус "Получен"
        OrderID: OrderId,
        CancelReasonID: 1,
        Comment: '',
        WishingDate: null,
      });
      // Обновление UI будет происходить автоматически после инвалидации кэша
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const renderStatusButton = () => {
    if (Status === 5) {
      return (
        <Button height="35px" variant="outline" onClick={handlePostOrder} isLoading={isSubmitting}>
          Провести заказ
        </Button>
      );
    }
    if (Status === 6) {
      return (
        <Button height="35px" variant="outline" onClick={handlePostOrderCheckout} isLoading={isSubmitting}>
          Заказ получен
        </Button>
      );
    }
    if (Status === 7) {
      return (
        <Button height="35px" variant="outline">
          [Пусто]
        </Button>
      );
    }
    return null;
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding="0 0 0 0">
        <Button onClick={onToggle} height="35px" variant="outline">Состав</Button>
        <Button height="35px" variant="outline">
          <NavLink to={`order/${OrderId}`}>Подробнее</NavLink>
        </Button>
        {renderStatusButton()}
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Box>
          <Box padding="7px 0 0 0">
            {renderContent()}
          </Box>
          <Box display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
            <Box>
              {isAllSelected && <Button width="60px" height="20px" fontSize="sm" fontWeight="extrabold" variant="outline" colorScheme="green" onClick={onClose}>Готово</Button>}
            </Box>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="center">
              <Text>Всего&#160;</Text>
              <Text fontWeight="bold">{QuantityPurchases}</Text>
              <Text>&#160;позиций, на сумму&#160;</Text>
              <Text fontWeight="bold">
                {Price}
                Р.
              </Text>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </>
  );
}

export default memo(OpenOrder);
