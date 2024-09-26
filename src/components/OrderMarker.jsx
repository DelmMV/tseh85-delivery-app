import { Marker, Tooltip } from 'react-leaflet';
import {
  Box, Link, Text,
} from '@chakra-ui/react';
import L from 'leaflet';
import { NavLink } from 'react-router-dom';
import { status } from '../utils/status';
import { convertTimestamp } from '../utils/convertTimestamp';
import { createMapLink } from '../utils/createMapLink';
import { useMapType } from '../contexts/MapTypeContext';

function OrderMarker({ order }) {
  const statusInfo = status(order.Status);
  const { mapType } = useMapType();

  const transparentIcon = L.icon({
    iconUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // 1x1 transparent GIF
    iconSize: [1, 1], // Small size
    iconAnchor: [0.5, 0.5], // Centered
  });

  return (
    <Marker position={[order.Latitude, order.Longitude]} icon={transparentIcon}>
      <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent interactive>
        <NavLink to={`/order/${order.OrderId}`}>
          <Text fontWeight="bold" color={statusInfo.color} fontSize="sm">
            Заказ №
            {order.DeliveryNumber}
          </Text>
        </NavLink>
        <Text fontSize="sm">
          Время:&#160;
          {convertTimestamp(order.WishingDate, 'HH:mm')}
        </Text>
        <Box display="flex" flexDirection="row">
          <Link href={createMapLink(`${order.Latitude},${order.Longitude}`, mapType)} fontSize="sm" isExternal>Маршрут</Link>
        </Box>
      </Tooltip>
    </Marker>
  );
}

export { OrderMarker };
