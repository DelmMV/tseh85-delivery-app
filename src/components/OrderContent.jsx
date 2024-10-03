import React, { useMemo } from 'react';
import {
  Box, Checkbox, Image, Text, Stack, Divider, Badge,
} from '@chakra-ui/react';
import plugImg from '../assets/image/logo-t85.jpeg';

function OrderContent({ getOrder, selectedItems, handleCheckboxChange }) {
  const groupedProducts = useMemo(() => {
    const groups = {};
    getOrder.forEach((product) => {
      if (!groups[product.CatalogName]) {
        groups[product.CatalogName] = [];
      }
      groups[product.CatalogName].push(product);
    });
    return groups;
  }, [getOrder]);

  return (
    <Stack spacing={0}>
      {Object.entries(groupedProducts).map(([catalogName, products]) => (
        <Box key={catalogName}>
          <Badge colorScheme="green" fontSize="md" fontWeight="bold" borderRadius="10px">{catalogName}</Badge>

          <Stack spacing={0}>
            {products.map((product) => (
              <React.Fragment key={product.RowId}>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexDir="row" height="70px">
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      isChecked={selectedItems[product.RowId] || false}
                      onChange={() => handleCheckboxChange(product.RowId)}
                      paddingRight="5px"
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      onClick={() => handleCheckboxChange(product.RowId)}
                    >
                      <Image
                        marginRight="6px"
                        borderRadius="10px"
                        borderWidth="0"
                        boxShadow="md"
                        width="45px"
                        height="45px"
                        src={product.PictureId ? `https://app.tseh85.com/Service/api/image?PictureId=${product.PictureId}` : plugImg}
                        alt={product.ProductName}
                      />
                      <Box display="flex" flexDir="column">
                        <Text fontSize="md" fontWeight="bold" width="220px">{product.ProductName}</Text>
                      </Box>
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
                  <Stack pl="40px">
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
            ))}
          </Stack>
          <Divider />
        </Box>
      ))}
    </Stack>
  );
}

export default OrderContent;
