import React, { createContext, useContext, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

const MapsContext = createContext();

const libraries = ['marker'];

export const MapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <MapsContext.Provider value={{ isLoaded }}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onLoad={() => setIsLoaded(true)}
        loadingElement={<div>Loading Maps...</div>}
      >
        {children}
      </LoadScript>
    </MapsContext.Provider>
  );
};

export const useMaps = () => {
  const context = useContext(MapsContext);
  if (!context) {
    throw new Error('useMaps must be used within a MapsProvider');
  }
  return context;
};