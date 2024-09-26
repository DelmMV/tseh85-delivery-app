import {
  Box, Button, Card, Divider, Link, Stack, Table, TableContainer, Tbody, Td, Text, Tr,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import React, {
  useCallback, useMemo, useState,
} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useOrderQuery } from '../hooks/useOrderQuery';
import OrderContent from '../components/OrderContent';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { RenderTextWishes } from '../components/RenderTextWishes';
import { DrawerPanel } from '../components/DrawerPanel';
import { status } from '../utils/status';
import { convertTimestamp } from '../utils/convertTimestamp';
import { useMapType } from '../contexts/MapTypeContext';
import { createMapLink } from '../utils/createMapLink';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

function Order() {
  const { OrderId } = useParams();
  const { data: getOrder, isLoading, isError } = useOrderQuery(OrderId);
  const { data: orders } = useOrdersQuery();
  const [selectedItems, setSelectedItems] = useState({});
  const handleCheckboxChange = useCallback((itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  }, []);

  const isAllSelected = getOrder && getOrder.every((item) => selectedItems[item.RowId]);
  const navigate = useNavigate(); // Используем useNavigate для программной навигации
  const goBack = () => navigate(-1);

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;
    return <OrderContent getOrder={getOrder} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} />;
  };

  const filterOrders = () => {
    const orderIdNum = parseInt(OrderId, 10);
    if (orders) {
      return orders?.filter((order) => order.OrderId === orderIdNum);
    }
    return null;
  };
  const filtered = useMemo(() => filterOrders(), [orders]);
  const [filteredOrder] = filtered || [{}];

  if (!filteredOrder) {
    return (
      <>
        <Text>Order not found</Text>
        <Button onClick={goBack}>
          <ArrowBackIcon />
        </Button>
      </>
    );
  }

  const {
    Price,
    PaymentType,
    QuantityPurchases,
    Address,
    ClientComment,
    DateOrder,
    DateComplete,
    DateReceipt,
    DateUpdate,
    DispecherComment,
    Wishes,
    WishingDate,
    ClientName,
    ClientPhone,
    DeliveryNumber,
    Status,
    CheckoutUserName,
    Nearest,
    Latitude,
    Longitude,
  } = filteredOrder;

  const { mapType } = useMapType();

  const renderMap = () => {
    if (!Latitude || !Longitude) return null; // Проверяем, есть ли координаты

    const position = [Latitude, Longitude];

    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
    });

    return (
      <MapContainer center={position} zoom={13} style={{ height: '200px', width: '100%' }} zoomControl={false} attributionControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={position}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              window.open(createMapLink(`${Latitude},${Longitude}`, mapType), '_blank');
            },
          }}
        />
      </MapContainer>
    );
  };
  return (
    <Card>
      <Stack spacing={2} margin="10px" divider={<Divider />}>
        <Box>
          {renderMap()}
        </Box>
        <Box display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
          <Button onClick={goBack}>
            <ArrowBackIcon />
          </Button>
          <Text fontWeight="bold" color={status(Status).color}>
            №
            {DeliveryNumber}
          </Text>
          <DrawerPanel />
        </Box>
        {Wishes && RenderTextWishes(Wishes)}
        {ClientComment && (
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <Text fontSize="sm">Комментарий:&#160;</Text>
            <Text fontWeight="bold">{ClientComment}</Text>
          </Box>
        )}
        <Box>
          {renderContent()}
          <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between">
            <Box>
              {isAllSelected && <Button width="60px" height="20px" fontSize="sm" fontWeight="extrabold" variant="outline" colorScheme="green">Готово</Button>}
            </Box>
            <Box display="flex" flexDir="row">
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
        <TableContainer borderWidth="1px" borderRadius="5px" boxShadow="lg">
          <Table size="sm" variant="striped" colorScheme="teal">
            <Tbody>
              <Tr>
                <Td>
                  Адрес:
                </Td>
                <Td whiteSpace="pre-wrap" fontWeight="bold"><Link href={createMapLink(`${Latitude},${Longitude}`, mapType)} fontSize="sm" isExternal>{Address}</Link></Td>
              </Tr>
              {ClientName && (
                <Tr>
                  <Td>Клиент:</Td>
                  <Td whiteSpace="pre-wrap" fontWeight="bold">{ClientName}</Td>
                </Tr>
              )}
              <Tr>
                <Td>Телефон:</Td>
                <Td fontWeight="bold">
                  <a href={`tel:${ClientPhone}`}>
                    +
                    {ClientPhone}
                  </a>
                </Td>
              </Tr>
              {
              PaymentType && (
              <Tr>
                <Td>Оплата:</Td>
                <Td fontWeight="bold">{PaymentType}</Td>
              </Tr>
              )
            }
              <Tr>
                <Td>Общая сумма:</Td>
                <Td fontWeight="bold">
                  {Price}
                  Р.
                </Td>
              </Tr>
              {DispecherComment && (
                <Tr>
                  <Td>Комментарий диспечера:</Td>
                  <Td whiteSpace="pre-wrap" fontWeight="bold">{DispecherComment}</Td>
                </Tr>
              )}
              {CheckoutUserName && (
                <Tr>
                  <Td>Выдан:</Td>
                  <Td whiteSpace="pre-wrap" fontWeight="bold">{CheckoutUserName}</Td>
                </Tr>
              )}
              <Tr>
                <Td>Ближайшее время:</Td>
                <Td fontWeight="bold">{Nearest ? 'Да' : 'Нет'}</Td>
              </Tr>
              <Tr>
                <Td>Время заказа:</Td>
                <Td fontWeight="bold">{convertTimestamp(DateOrder)}</Td>
              </Tr>
              <Tr>
                <Td>Желаемое время получения:</Td>
                <Td fontWeight="bold">
                  {convertTimestamp(WishingDate)}
                </Td>
              </Tr>
              {DateComplete && (
                <Tr>
                  <Td>Время подтверждения:</Td>
                  <Td fontWeight="bold">{convertTimestamp(DateComplete)}</Td>
                </Tr>
              )}
              {DateReceipt && (
                <Tr>
                  <Td>Время получения:</Td>
                  <Td fontWeight="bold">{convertTimestamp(DateReceipt)}</Td>
                </Tr>
              )}
              {DateUpdate && (
                <Tr>
                  <Td>Время обновления:</Td>
                  <Td fontWeight="bold">{convertTimestamp(DateUpdate)}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
}
export { Order };
