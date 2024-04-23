import { Box, Text } from '@chakra-ui/react';

function RenderTextWishes(wishes) {
  if (!wishes || wishes.length === 0) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="row">
      <Text fontSize="sm">Пожелания:</Text>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {wishes.map((wish) => (
          <Text
            key={wish.ID}
            fontSize="md"
            marginLeft="10px"
            fontWeight="bold"
          >
            {wish.Name}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

export { RenderTextWishes };
