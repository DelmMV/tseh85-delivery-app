import React, { useCallback, useState, memo } from 'react';
import {
  Box, Button, Collapse, useDisclosure, Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useOrderQuery } from '../hooks/useOrderQuery';
import OrderContent from './OrderContent';

function OpenOrder({ QuantityPurchases, Price, OrderId }) {
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

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding="0 0 0 0">
        <Button onClick={onToggle} height="35px" variant="outline">Состав</Button>
        <Button height="35px" variant="outline">
          <NavLink to={`order/${OrderId}`}>Подробнее</NavLink>
        </Button>
        <Button height="35px" variant="outline">
          Провести заказ
        </Button>
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
