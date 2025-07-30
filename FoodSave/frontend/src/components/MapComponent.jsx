import React, { useState, useCallback } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import { useMaps } from '../context/MapsContext';

const containerStyle = {
  width: '100%',
  height: '300px',
};

// Default center to Lahore coordinates
const defaultCenter = {
  lat: 31.5497, // Lahore Latitude
  lng: 74.3436, // Lahore Longitude
};

const MapComponent = ({ location, donorName, foodTitle }) => {
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const { isLoaded } = useMaps();
  
  // Use provided coordinates or default to Lahore
  const center = location?.coordinates && location.coordinates.length === 2 
    ? { lat: location.coordinates[1], lng: location.coordinates[0] } // Note: MongoDB stores [lng, lat]
    : defaultCenter;

  const onLoad = useCallback((map) => {
    setMap(map);
    
    // Create AdvancedMarkerElement when map loads
    if (window.google && window.google.maps.marker && isLoaded) {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      
      const markerElement = new AdvancedMarkerElement({
        map,
        position: center,
        title: `Pickup location for ${foodTitle || 'Food Donation'}`,
      });
      
      // Add click listener
      markerElement.addListener('click', () => {
        setSelected(center);
      });
      
      setMarker(markerElement);
    }
  }, [center, foodTitle, isLoaded]);

  const onUnmount = useCallback(() => {
    if (marker) {
      marker.map = null;
    }
    setMap(null);
    setMarker(null);
  }, [marker]);

  if (!isLoaded) {
    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">📍 Pickup Location</h4>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          Loading Maps...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">📍 Pickup Location</h4>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
        }}
      >
        {/* InfoWindow for selected marker */}
        {selected ? (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
          >
            <div className="p-2">
              <h3 className="font-semibold text-gray-800">{foodTitle || 'Food Donation'}</h3>
              <p className="text-sm text-gray-600">Donor: {donorName || 'Anonymous'}</p>
              <p className="text-sm text-gray-600">Address: {location?.address || 'Address not provided'}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
