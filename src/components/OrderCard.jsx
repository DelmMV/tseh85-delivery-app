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
  Text, useToast,
} from '@chakra-ui/react';
import { BsTelephone } from 'react-icons/bs';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { FaAirbnb, FaUtensils } from 'react-icons/fa';
import { CgComment } from 'react-icons/cg';
import { PiFaceMaskThin } from 'react-icons/pi';
import { LuClipboardCopy } from 'react-icons/lu';
import { OpenModalOrder } from './OpenModalOrder';
import { status } from '../utils/status';
import { convertTimestamp } from '../utils/convertTimestamp';
import { useMapType } from '../contexts/MapTypeContext';

function OrderCard({ order }) {
  const {
    Price, QuantityPurchases, Address, ClientComment, OrderId, DateOrder, Wishes, WishingDate, ClientName, ClientPhone, DeliveryNumber, Status, CheckoutUserName, Nearest,
  } = order;
  const { mapType } = useMapType(); // Использование хука useMapType
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
      return null;
    }

    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Text fontSize="sm">Пожелания:</Text>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
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
  const statusInfo = status(Status);
  const toast = useToast();
  function copyToClipboard(text) {
    // Создаем временный элемент input
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-1000px';
    tempInput.style.top = '-1000px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Для мобильных устройств

    try {
      const successful = document.execCommand('copy');
      toast({
        title: successful ? 'Скопировано' : 'Ошибка',
        status: successful ? 'success' : 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (err) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать номер доставки.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }

    // Удаляем временный элемент
    document.body.removeChild(tempInput);
  }

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
                      <Box display="flex" flexDirection="row" alignItems="center" onClick={() => copyToClipboard(DeliveryNumber)}>
                        <Button variant="outline" width="100px" height="18px" padding="5px 0 5px 0" borderWidth="0">
                          <Text fontSize="md" fontWeight="bold" marginRight="2px">
                            №
                            {DeliveryNumber}
                          </Text>
                          <LuClipboardCopy />
                        </Button>
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
                                  <Box display="flex" flexDirection="row" alignItems="flex-start">
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
