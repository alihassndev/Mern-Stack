import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Set the center to Lahore coordinates
const center = {
  lat: 31.5497, // Lahore Latitude
  lng: 74.3436, // Lahore Longitude
};

const MapComponent = () => {
  const [selected, setSelected] = useState(null);

  const onSelect = useCallback((item) => {
    setSelected(item);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center} // Set center to Lahore
        zoom={12} // You can adjust the zoom level as needed
      >
        {/* Marker for Lahore */}
        <Marker
          position={center}
          onClick={() => onSelect(center)} // Show info window when clicked
        />

        {/* InfoWindow for selected marker */}
        {selected ? (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Lahore</h2>
              <p>Welcome to Lahore!</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
