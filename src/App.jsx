// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Heatmap from './pages/Heatmap';
// import { MapContainer } from 'react-leaflet';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heatmap" element={<Heatmap />} />
        </Routes>
      </Router>
  );
}

export default App;
