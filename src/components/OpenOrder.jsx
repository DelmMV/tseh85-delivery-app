import React, {
  useCallback, useState, memo, useEffect,
} from 'react';
import {
  Box, Button, Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useOrderQuery } from '../hooks/useOrderQuery';
import OrderContent from './OrderContent';
import DeliveryButton from './DeliveryButton';

function OpenOrder({
  QuantityPurchases,
  Price,
  OrderId,
  Status,
}) {
  const [isContentVisible, setIsContentVisible] = useState(() => {
    const saved = localStorage.getItem(`order_${OrderId}_visible`);
    return saved !== null ? JSON.parse(saved) : false;
  });

  const { data: getOrder, isLoading, isError } = useOrderQuery(OrderId, { enabled: isContentVisible });
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem(`order_${OrderId}_selected_items`);
    return saved !== null ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`order_${OrderId}_visible`, JSON.stringify(isContentVisible));
  }, [isContentVisible, OrderId]);

  useEffect(() => {
    localStorage.setItem(`order_${OrderId}_selected_items`, JSON.stringify(selectedItems));
  }, [selectedItems, OrderId]);

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

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding="0 0 0 0" marginBottom="5px">
        <Button onClick={() => setIsContentVisible(!isContentVisible)} height="35px" variant="outline">
          {isContentVisible ? '▲Состав' : '▼Состав'}
        </Button>
        <Button height="35px" variant="outline">
          <NavLink to={`order/${OrderId}`}>Подробнее</NavLink>
        </Button>
        <DeliveryButton
          Status={Status}
          OrderId={OrderId}
        />
      </Box>

      {isContentVisible && (
        <Box>
          <Box padding="7px 0 0 0">
            {renderContent()}
          </Box>
          <Box display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
            <Box>
              {isAllSelected && (
                <Button
                  width="60px"
                  height="20px"
                  fontSize="sm"
                  fontWeight="extrabold"
                  variant="outline"
                  colorScheme="green"
                  onClick={() => setIsContentVisible(false)}
                >
                  Готово
                </Button>
              )}
            </Box>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="center" padding="5px">
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
      )}
    </>
  );
}

export default memo(OpenOrder);
