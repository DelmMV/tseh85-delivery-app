import React, { useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { AspectRatio } from '@chakra-ui/react';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import { useFilter } from '../contexts/FilterContext';
import { useSearch } from '../contexts/SearchContext';
import { useSelectorFilter } from '../contexts/SelectorFilterContext';
import 'react-leaflet-markercluster/dist/styles.min.css';
import OrderMarker from '../components/OrderMarker';

function MapComponent() {
  const { data: orders } = useOrdersQuery();
  const { filter } = useFilter();
  const { searchQuery } = useSearch();
  const { selectorFilter } = useSelectorFilter();
  const position = [59.941, 30.304];
  const filteredOrders = useMemo(() => orders?.filter((order) => {
    const isActive = filter === 'active' ? order.Status !== 7 : order.Status === 7;
    if (!isActive) return false;

    let statusMatch = true;
    if (filter !== 'completed' && selectorFilter) {
      statusMatch = order.Status === Number(selectorFilter);
    }

    const matchesSearchQuery = Object.values(order).some((val) => {
      const valueAsString = val.toString().toLowerCase();
      return (typeof val === 'string' || typeof val === 'number')
          && valueAsString.includes(searchQuery.toLowerCase());
    });
    return statusMatch && matchesSearchQuery;
  }) || [], [orders, filter, searchQuery, selectorFilter]);

  return (
    <AspectRatio zIndex="0" ratio={21 / 9} position="relative" top="100px">
      <MapContainer center={position} zoom={11} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredOrders.map((order) => (
          <OrderMarker key={order.OrderId} order={order} />))
        }
      </MapContainer>
    </AspectRatio>
  );
}

export { MapComponent };
