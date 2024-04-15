import React, { createContext, useContext, useState } from 'react';

const MapTypeContext = createContext();

export const useMapType = () => useContext(MapTypeContext);

export function MapTypeProvider({ children }) {
  const [mapType, setMapType] = useState(localStorage.getItem('mapType') || 'yandex');

  const changeMapType = (type) => {
    setMapType(type);
    localStorage.setItem('mapType', type);
  };

  return (
    <MapTypeContext.Provider value={{ mapType, changeMapType }}>
      {children}
    </MapTypeContext.Provider>
  );
}
