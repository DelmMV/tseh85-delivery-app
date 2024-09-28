import { AspectRatio, Box, Spinner } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { OrderMarker } from '../components/OrderMarker';
import { useFilter } from '../contexts/FilterContext';
import { useSearch } from '../contexts/SearchContext';
import { useSelectorFilter } from '../contexts/SelectorFilterContext';
import { useOrdersQuery } from '../hooks/useOrdersQuery';

function MapComponent() {
  const { data: orders, isLoading } = useOrdersQuery();
  const { filter } = useFilter();
  const { searchQuery } = useSearch();
  const { selectorFilter } = useSelectorFilter();
  const position = [59.941, 30.304];

  const filteredOrders = useMemo(() => {
    if (!orders) {
      return [];
    }
    return orders.filter((order) => {
      const isActive = filter === 'active' ? order.Status !== 7 : order.Status === 7;
      if (!isActive) return false;

      let statusMatch = true;
      if (filter !== 'completed' && selectorFilter) {
        statusMatch = order.Status === Number(selectorFilter);
      }

      const matchesSearchQuery = Object.values(order).some((val) => {
        const valueAsString = val.toString().toLowerCase();
        return (
          (typeof val === 'string' || typeof val === 'number') && valueAsString.includes(searchQuery.toLowerCase())
        );
      });
      return statusMatch && matchesSearchQuery;
    });
  }, [orders, filter, searchQuery, selectorFilter]);

  return (
    <AspectRatio zIndex="0" ratio={21 / 9} position="relative">
      <MapContainer
        center={position}
        zoom={11}
        style={{ height: '100vh', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {!isLoading ? filteredOrders.map((order) => (
          <OrderMarker key={order.OrderId} order={order} />
        )) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="xl" />
          </Box>
        )}
      </MapContainer>
    </AspectRatio>
  );
}
export { MapComponent };
