import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function PageNotFound() {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Text fontSize="4xl">Что-то пошло не так!</Text>
    </Box>
  );
}

export { PageNotFound };
