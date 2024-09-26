import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsTelephone } from 'react-icons/bs';
import { LuClipboardCopy } from 'react-icons/lu';
import { useMapType } from '../contexts/MapTypeContext';
import { convertTimestamp } from '../utils/convertTimestamp';
import { status } from '../utils/status';
import OpenOrder from './OpenOrder';
import { useCopyToClipboard } from '../hooks/useСopyToClipboard';
import { RenderIconWishes } from './RenderIconWishes';
import { RenderTextWishes } from './RenderTextWishes';
import { RenderIconComments } from './RenderIconComments';
import { createMapLink } from '../utils/createMapLink';

function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    Price,
    QuantityPurchases,
    Address,
    ClientComment,
    OrderId,
    Wishes,
    WishingDate,
    ClientName,
    ClientPhone,
    DeliveryNumber,
    Status,
    CheckoutUserName,
    Nearest,
  } = order;
  const { mapType } = useMapType();

  const statusInfo = status(Status);
  const { copyText } = useCopyToClipboard();

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const shortenedAddress = Address.length > 40 ? `${Address.substring(0, 40)}...` : Address;

  return (
    <Card
      borderWidth="0"
      borderLeft="1px"
      borderRight="1px"
      borderColor="grey"
      alignItems="center"
      boxShadow="md"
      margin="0 0 0 0"
      padding="0 5px 0 5px"
    >
      <CardBody width="380px" padding="0 3px 0 3px">
        <Stack spacing="1">
          <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop="3px">
            <Box display="flex" flexDirection="row" alignItems="center" onClick={() => copyText(DeliveryNumber)}>
              <Button variant="outline" width="100px" height="30px" padding="5px 0 5px 0" borderWidth="0">
                <Text fontSize="md" fontWeight="bold" marginRight="2px">
                  №
                  {DeliveryNumber}
                </Text>
                <LuClipboardCopy />
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box marginRight="10px">
                {RenderIconComments(ClientComment)}
              </Box>
              <Box display="flex" flexDirection="row">
                {RenderIconWishes(Wishes)}
              </Box>
            </Box>
            <Box>
              <Button onClick={toggleExpand} padding="0" variant="unstyled" display="flex" alignItems="center" height="100%">
                <Text fontSize="sm" textTransform="uppercase" color={statusInfo.color} fontWeight="bold" marginRight="5px">
                  {statusInfo.label}
                </Text>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Text fontSize="md" fontWeight="bold">
              <Link href={createMapLink(Address, mapType)} isExternal>
                {isExpanded ? Address : shortenedAddress}
              </Link>
            </Text>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row" alignItems="center">
              <Text fontSize="sm">Доставить до:&#160;</Text>
              <Text fontSize="md" fontWeight="bold">
                {convertTimestamp(WishingDate, 'HH:mm')}
              </Text>
            </Box>
            <Text fontSize="sm">{Nearest ? 'Ближайшее' : ' '}</Text>
            <Text fontSize="md" display="flex" flexDirection="row" alignItems="center" fontWeight="bold">
              <BsTelephone padding="0" margin="5px" />
              <a href={`tel:${ClientPhone}`}>
                +
                {ClientPhone}
              </a>
            </Text>
          </Box>
          {isExpanded && (
            <Stack spacing="1">
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                  {ClientName && (
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Text fontSize="sm">Гость:&#160;</Text>
                      <Text fontSize="md" fontWeight="bold">
                        {ClientName}
                      </Text>
                    </Box>
                  )}
                  {CheckoutUserName && (
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Text fontSize="sm">Выдан:&#160;</Text>
                      <Text fontSize="md" fontWeight="bold">
                        {CheckoutUserName}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box>
                {ClientComment && (
                  <Box display="flex" flexDirection="row" alignItems="flex-start">
                    <Text fontSize="sm">Комментарий:&#160;</Text>
                    <Text fontWeight="bold">{ClientComment}</Text>
                  </Box>
                )}
              </Box>
              <Box>{Wishes && RenderTextWishes(Wishes)}</Box>
            </Stack>
          )}
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="stretch">
            <OpenOrder DeliveryNumber={DeliveryNumber} Price={Price} QuantityPurchases={QuantityPurchases} OrderId={OrderId} Status={Status} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export { OrderCard };
