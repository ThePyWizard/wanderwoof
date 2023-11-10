import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Heatmap() {
  const [reportedLocations, setReportedLocations] = useState([]);

  useEffect(() => {
    const fetchReportedLocations = async () => {
      try {
        const locationsCollection = collection(db, 'locations');
        const locationsSnapshot = await getDocs(locationsCollection);

        const locationsData = [];
        locationsSnapshot.forEach((doc) => {
          const coordinates = doc.data().coordinates; // Assuming the field name in your Firestore document is "coordinates"
          locationsData.push(coordinates);
        });

        setReportedLocations(locationsData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchReportedLocations();
  }, []);

  // Calculate the average coordinates to center the map
  const averageCoordinate = reportedLocations.length > 0
    ? reportedLocations.reduce(
        (sum, location) => [sum[0] + location[0] / reportedLocations.length, sum[1] + location[1] / reportedLocations.length],
        [0, 0]
      )
    : [0, 0];

  // Custom icon for markers
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className=''>
      {/* Render the map with reported locations */}
      {reportedLocations.length > 0 && (
        <MapContainer center={averageCoordinate} zoom={13} style={{ height: '1000px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reportedLocations.map((location, index) => (
            <Marker key={index} position={location} icon={customIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Heatmap;
