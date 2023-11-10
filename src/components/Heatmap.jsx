// Heatmap.js
import React from 'react';
import { useLocation } from './LocationContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Heatmap() {
  const { reportedLocations } = useLocation();

  return (
    <div>
      <h2>Heat Map</h2>
      {/* Render the map with reported locations */}
      {reportedLocations.length > 0 && (
        <MapContainer
          center={reportedLocations[0]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          {reportedLocations.map((location, index) => (
            <Marker key={index} position={location}>
              <Popup>Reported Location {index + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Heatmap;
