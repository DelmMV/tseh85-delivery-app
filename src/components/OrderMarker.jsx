import React, { useEffect, useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { Box, Link, Text } from '@chakra-ui/react';
import { status } from '../utils/status';
import { convertTimestamp } from '../utils/convertTimestamp';
import { useMapType } from '../contexts/MapTypeContext';

function OrderMarker({ order }) {
  const statusInfo = status(order.Status);
  const { mapType } = useMapType();

  function createMapLink(address) {
    if (mapType === 'yandex') {
      return `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
    } if (mapType === '2gis') {
      return `https://2gis.ru/search/${encodeURIComponent(address)}`;
    }
    return null;
  }
  return (
    <Marker position={[order.Latitude, order.Longitude]}>
      <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent interactive>
        <Text color={statusInfo.color} fontWeight="bold">
          Заказ №
          {order.DeliveryNumber}
        </Text>
        <Text>
          Время:
          {convertTimestamp(order.WishingDate)}
        </Text>
        <Box display="flex" flexDirection="row">
          <Link href={createMapLink(order.Address)} isExternal>Маршрут</Link>
          &#8195;
          <Text>Заказ</Text>
        </Box>
      </Tooltip>
    </Marker>
  );
}

export default OrderMarker;
