import React, { useCallback, useState, memo } from 'react';
import {
  Box, Button, Collapse, useDisclosure, Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useOrderQuery } from '../hooks/useOrderQuery';
import OrderContent from './OrderContent';

async function postOrder({ Status, OrderID, CancelReasonID, Comment, WishingDate }) {
  const acesToken = localStorage.getItem('token');
  const response = await fetch('https://app.tseh85.com/Service/api/delivery/order/input', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: acesToken,
    },
    body: JSON.stringify({
      Status,
      OrderID,
      CancelReasonID,
      Comment,
      WishingDate,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

function OpenOrder({ QuantityPurchases, Price, OrderId, Status }) {
  console.log("OpenOrder Status:", Status); // Отладочное сообщение

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

  const handlePostOrder = async () => {
    try {
      const result = await postOrder({
        Status: 5, // Статус "Подтвержден"
        OrderID: OrderId,
        CancelReasonID: 1,
        Comment: "",
        WishingDate: null,
      });
      if (result.status === 200) {
        console.log("Order status updated to 'на доставке'");
        // Дополнительные действия после успешного обновления статуса
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePostOrderСheckout = async () => {
    try {
      const result = await postOrder({
        Status: 7, // Статус "Получен"
        OrderID: OrderId,
        CancelReasonID: 1,
        Comment: "",
        WishingDate: null,
      });
      if (result.status === 200) {
        console.log("Order status updated to 'на доставке'");
        // Дополнительные действия после успешного обновления статуса
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderStatusButton = () => {
    if (Status === 5) {
      return (
        <Button height="35px" variant="outline" onClick={handlePostOrder}>
          Провести заказ
        </Button>
      );
    } else if (Status === 6) {
      return (
        <Button height="35px" variant="outline" onClick={handlePostOrderСheckout}>
          Заказ получен
        </Button>
      );
    } else if (Status === 7) {
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
