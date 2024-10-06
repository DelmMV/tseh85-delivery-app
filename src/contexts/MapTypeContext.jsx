import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

const MapTypeContext = createContext();

export const useMapType = () => useContext(MapTypeContext);

export function MapTypeProvider({ children }) {
  const [mapType, setMapType] = useState(localStorage.getItem('mapType') || 'yandex');

  const changeMapType = (type) => {
    setMapType(type);
    localStorage.setItem('mapType', type);
  };

  const value = useMemo(() => ({ mapType, changeMapType }), [mapType]);

  return (
    <MapTypeContext.Provider value={value}>
      {children}
    </MapTypeContext.Provider>
  );
}
