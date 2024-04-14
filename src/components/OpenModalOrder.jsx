import React, { useState, useCallback } from 'react';
import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,
  ModalOverlay, Text, Image, useDisclosure, Box, ModalFooter, Checkbox, Stack,
} from '@chakra-ui/react';
import { useOrderQuery } from '../hooks/useOrderQuery';
import plugImg from '../assets/image/logo-t85.jpeg';

function OpenModalOrder({
  DeliveryNumber, QuantityPurchases, Price, OrderId,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: getOrder, isLoading, isError } = useOrderQuery(OrderId, { enabled: isOpen });
  const [selectedItems, setSelectedItems] = useState({});
  const isAllSelected = getOrder && getOrder.every((item) => selectedItems[item.RowId]);

  const handleCheckboxChange = useCallback((itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  }, []);

  const renderProduct = useCallback((product) => (
    <React.Fragment key={product.RowId}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDir="row" height="70px">
        <Box display="flex" alignItems="center">
          <Checkbox
            isChecked={selectedItems[product.RowId] || false}
            onChange={() => handleCheckboxChange(product.RowId)}
            paddingRight="5px"
          />
          <Image
            marginRight="6px"
            borderRadius="10px"
            width="45px"
            height="45px"
            src={product.PictureId ? `https://app.tseh85.com/Service/api/image?PictureId=${product.PictureId}` : plugImg}
            alt={product.ProductName}
          />
          <Box display="flex" flexDir="column">
            <Text fontSize="md" fontWeight="bold" width="220px">{product.ProductName}</Text>
            <Text fontSize="sm" fontWeight="bold" color="grey">{product.CatalogName}</Text>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" flexDir="column">
          <Text fontSize="sm" fontWeight="bold" color={product.Quantity > 1 ? 'red' : 'inherit'}>
            {product.Quantity}
            {' '}
            шт.
          </Text>
          <Text fontSize="12px" color="grey" fontWeight="bold">
            {product.Amount}
            {' '}
            Р
          </Text>
        </Box>
      </Box>
      {product.Products && product.Products.length > 0 && (
        <Stack pl="40px" spacing={1}>
          {product.Products.map((nestedProduct) => (
            <Box key={nestedProduct.RowId} display="flex" justifyContent="space-between" alignItems="center" flexDir="row" height="25px">
              <Box display="flex" alignItems="center">
                <Image
                  marginRight="6px"
                  borderRadius="10px"
                  width="25px"
                  height="25px"
                  src={nestedProduct.PictureId ? `https://app.tseh85.com/Service/api/image?PictureId=${nestedProduct.PictureId}` : plugImg}
                  alt={nestedProduct.ProductName}
                />
                <Box display="flex" flexDir="row">
                  <Text marginRight="5px" fontSize="13" fontStyle="italic" fontWeight="extrabold" color="#8b00ff">{nestedProduct.ProductName}</Text>
                  <Text fontSize="13" color="#8b00ff">{nestedProduct.Quantity}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </React.Fragment>
  ), [selectedItems, handleCheckboxChange]);

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;
    return getOrder.map(renderProduct);
  };

  return (
    <>
      <Button onClick={onOpen} width="100%" height="25px" variant="outline">Состав</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay width="100%" height="100%" />
        <ModalContent margin="5px">
          <ModalHeader padding="10px">
            <Text>
              Заказ №
              {DeliveryNumber}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="7px">
            {renderContent()}
          </ModalBody>
          <ModalFooter display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
            <Box>
              {isAllSelected && <Button width="60px" height="20px" fontSize="sm" fontWeight="extrabold" variant="outline" colorScheme="green" onClick={onClose}>Готово</Button>}
            </Box>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="center">
              <Text>Всего:&#160;</Text>
              <Text fontWeight="bold">{QuantityPurchases}</Text>
              <Text>&#160;шт. на сумму&#160;</Text>
              <Text fontWeight="bold">
                {Price}
                Р.
              </Text>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { OpenModalOrder };
