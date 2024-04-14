import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody, Divider, Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BsTelephone } from 'react-icons/bs';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { FaAirbnb, FaUtensils } from 'react-icons/fa';
import { CgComment } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { PiFaceMaskThin } from 'react-icons/pi';
import { OpenModalOrder } from './OpenModalOrder';
import { status } from '../utils/status';
import { convertTimestamp } from '../utils/convertTimestamp';

function OrderCard({ order }) {
  const {
    Price, QuantityPurchases, Address, ClientComment, OrderId, DateOrder, Wishes, WishingDate, ClientName, ClientPhone, DeliveryNumber, Status, CheckoutUserName, Nearest,
  } = order;
  const [mapType, setMapType] = useState(() => {
    const savedMapType = localStorage.getItem('mapType');
    return savedMapType || 'yandex';
  });

  // Сохранение выбранного типа карты в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('mapType', mapType);
  }, [mapType]);

  function createMapLink(address) {
    if (mapType === 'yandex') {
      return `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
    } if (mapType === '2gis') {
      return `https://2gis.ru/search/${encodeURIComponent(address)}`;
    }
    return null;
  }

  function renderIconComments(comments) {
    if (!comments || comments.length === 0) {
      return null; // Если массив пуст или отсутствует, возвращаем null
    }
    return <CgComment />;
  }

  function renderTextWishes(wishes) {
    if (!wishes || wishes.length === 0) {
      return null; // Если массив пуст или отсутствует, возвращаем null
    }

    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Text fontSize="sm">Пожелания:</Text>
        <Box display="flex" flexDirection="column">
          {wishes.map((wish) => (
            <Text key={wish.ID} fontSize="md" marginLeft="10px" fontWeight="bold">
              {wish.Name}
            </Text>
          ))}
        </Box>
      </Box>
    );
  }
  function renderIconWishes(wishes) {
    if (!wishes || wishes.length === 0) {
      return null; // Если массив пуст или отсутствует, возвращаем null
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
  const statusInfo = status(Status);

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
        <Accordion defaultIndex={[1]} allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => {
              const shortenedAddress = Address.length > 40 ? `${Address.substring(0, 40)}...` : Address;
              const accordionContent = (
                <Box as="span" flex="1" textAlign="left">
                  <Stack spacing="1">
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Box>
                        <Text fontSize="md" fontWeight="bold">
                          №
                          {DeliveryNumber}
                        </Text>
                      </Box>
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <Box marginRight="10px">{renderIconComments(ClientComment)}</Box>
                        <Box display="flex" flexDirection="row">{renderIconWishes(Wishes)}</Box>
                      </Box>
                      <Box display="flex" flexDirection="row">
                        <AccordionButton padding="0">
                          <Text fontSize="sm" textTransform="uppercase" color={statusInfo.color} fontWeight="bold" paddingRight="5px">
                            {statusInfo.label}
                          </Text>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </Box>
                    </Box>
                    <Divider />
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Text fontSize="md" fontWeight="bold">
                        {isExpanded ? <Link href={createMapLink(Address)} isExternal>{Address}</Link> : <Link href={createMapLink(Address)} isExternal>{shortenedAddress}</Link>}
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <Text fontSize="sm">
                          Доставить до:&#160;
                        </Text>
                        <Text fontSize="md" fontWeight="bold">
                          {convertTimestamp(WishingDate)}
                        </Text>
                      </Box>
                      <Text fontSize="sm">
                        {Nearest ? 'Ближайшее' : ' '}
                      </Text>
                      <Text fontSize="md" display="flex" flexDirection="row" alignItems="center" fontWeight="bold">
                        <BsTelephone padding="0" margin="5px" />
                        <a href={`tel:${ClientPhone}`}>
                          +
                          {ClientPhone}
                        </a>
                      </Text>
                    </Box>
                    {!isExpanded
                            && (
                            <OpenModalOrder DeliveryNumber={DeliveryNumber} Price={Price} QuantityPurchases={QuantityPurchases} OrderId={OrderId} />
                            )}
                  </Stack>
                </Box>
              );
              return (
                <Stack spacing="1">
                  {accordionContent}
                  <Box>
                    <AccordionPanel pb={2} padding="0 0 0 0" margin="0 0 0 0">
                      <Stack spacing="1">
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                          <Box display="flex" flexDirection="column">
                            {ClientName && (
                            <Box display="flex" flexDirection="row" alignItems="center">
                              <Text fontSize="sm">
                                Гость:&#160;
                              </Text>
                              <Text fontSize="md" fontWeight="bold">
                                {ClientName}
                              </Text>
                            </Box>
                            )}
                            {CheckoutUserName && (
                            <Box display="flex" flexDirection="row" alignItems="center">
                              <Text fontSize="sm">
                                Выдан:&#160;
                              </Text>
                              <Text fontSize="md" fontWeight="bold">{CheckoutUserName}</Text>
                            </Box>
                            )}
                          </Box>
                        </Box>
                        <Box>
                          {ClientComment
                                  && (
                                  <Box display="flex" flexDirection="row" alignItems="center">
                                    <Text fontSize="sm">Комментарий:&#160;</Text>
                                    <Text fontWeight="bold">{ClientComment}</Text>
                                  </Box>
                                  )}
                        </Box>
                        <Box>
                          {Wishes && renderTextWishes(Wishes)}
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" margin="0 0 5px 0">
                          <Button width="95px" height="30px" variant="outline">Подробнее</Button>
                          <Button width="140px" height="30px" variant="outline">Провести заказ</Button>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </Box>
                </Stack>
              );
            }}
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}
export { OrderCard };
