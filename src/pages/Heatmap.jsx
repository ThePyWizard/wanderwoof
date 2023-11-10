import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { collection,getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Heatmap() {
  const [reportedLocations, setReportedLocations] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locations = [];
      querySnapshot.forEach(doc => {

        const lat = doc.data().location[0];
        const lng = doc.data().location[1];
      
        locations.push({
          lat,
          lng  
        });
      
      })
      console.log(locations);
      setReportedLocations(locations);
    }
  
    fetchData();
  }, []);

  // Calculate the average coordinates to center the map
  const averageCoordinate = reportedLocations.reduce(
    (sum, location) => [sum[0] + location[0] / reportedLocations.length, sum[1] + location[1] / reportedLocations.length],
    [0, 0]
  );

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
