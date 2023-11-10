import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../src/firebase';
import { addDoc, collection } from 'firebase/firestore';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [reportedLocations, setReportedLocations] = useState([]);

  return (
    <LocationContext.Provider value={{ reportedLocations, addReportedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const addReportedLocation = async (location) => {
  const locationsCollection = collection(db, 'locations');

  await addDoc(locationsCollection, {
    location: location,
    // Other fields you want to add to the document
  });
};
