import {
  Box,
  Text,
  Badge,
  Link,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { BsTelephone } from 'react-icons/bs';
import { convertTimestamp } from '../utils/convertTimestamp';
import { status } from '../utils/status';
import { RenderTextWishes } from './RenderTextWishes';
import { createMapLink } from '../utils/createMapLink';
import { useMapType } from '../contexts/MapTypeContext';

function OrderModal({ order }) {
  const {
    Price,
    Address,
    ClientComment,
    Wishes,
    WishingDate,
    ClientName,
    ClientPhone,
    DeliveryNumber,
    Status,
    Nearest,
  } = order;

  const { mapType } = useMapType();
  const statusInfo = status(Status);

  return (
    <Box padding="3">
      <Stack spacing="2">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Badge colorScheme={statusInfo.color} fontSize="md">
            {statusInfo.label}
          </Badge>
          <Text fontWeight="bold" fontSize="lg">
            №
            {DeliveryNumber}
          </Text>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold">Адрес:</Text>
          <Link href={createMapLink(Address, mapType)} isExternal>
            {Address}
          </Link>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text>
            Доставить:
            {convertTimestamp(WishingDate, 'HH:mm')}
          </Text>
          {Nearest && <Badge colorScheme="green">Ближайшее</Badge>}
        </Box>

        <Box>
          <Text fontWeight="bold">Телефон:</Text>
          <Text display="flex" alignItems="center">
            <BsTelephone style={{ marginRight: '5px' }} />
            <a href={`tel:+${ClientPhone}`}>
              +
              {ClientPhone}
            </a>
          </Text>
        </Box>

        {ClientName && (
          <Box>
            <Text fontWeight="bold">Клиент:</Text>
            <Text>{ClientName}</Text>
          </Box>
        )}

        {ClientComment && (
          <Box>
            <Text fontWeight="bold">Комментарий:</Text>
            <Text>{ClientComment}</Text>
          </Box>
        )}

        {Wishes && Wishes.length > 0 && (
          <Box>
            <Text fontWeight="bold">Пожелания:</Text>
            {RenderTextWishes(Wishes)}
          </Box>
        )}

        <Box>
          <Text fontWeight="bold">Сумма заказа:</Text>
          <Text>
            {Price}
            {' '}
            Р.
          </Text>
        </Box>
        <Box />
      </Stack>
    </Box>
  );
}

export { OrderModal };
