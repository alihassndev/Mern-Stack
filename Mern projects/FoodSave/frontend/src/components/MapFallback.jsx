import React from 'react';

const MapFallback = ({ location, donorName, foodTitle }) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">📍 Pickup Location</h4>
      <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <h3 className="font-semibold text-gray-800 mb-1">{foodTitle || 'Food Donation'}</h3>
          <p className="text-sm text-gray-600">Donor: {donorName || 'Anonymous'}</p>
          <p className="text-sm text-gray-600">Address: {location?.address || 'Address not provided'}</p>
          <p className="text-xs text-gray-500 mt-2">Map unavailable - Please enable Google Maps billing</p>
        </div>
      </div>
    </div>
  );
};

export default MapFallback;