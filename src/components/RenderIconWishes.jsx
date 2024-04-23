import { FaAirbnb, FaUtensils } from 'react-icons/fa';
import { PiFaceMaskThin } from 'react-icons/pi';
import { Text } from '@chakra-ui/react';

function RenderIconWishes(wishes) {
  if (!wishes || wishes.length === 0) {
    return null;
  }

  return wishes.map((wish) => {
    let icon;

    switch (wish.ID) {
      case 1:
        icon = <FaAirbnb />;
        break;
      case 2:
        icon = <FaUtensils />;
        break;
      case 3:
        icon = <PiFaceMaskThin />;
        break;
      default:
        icon = null;
        break;
    }

    return (
      <Text key={wish.ID} fontSize="md" marginRight="2px">
        {icon}
      </Text>
    );
  });
}
export { RenderIconWishes };
