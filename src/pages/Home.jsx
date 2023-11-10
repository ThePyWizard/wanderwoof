import React, { useState } from 'react';
import bgimage from './../assets/bgimage.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from './../LocationContext';
import {addReportedLocation} from '../LocationContext'

function Home() {
  const navigate = useNavigate();
  // const { addReportedLocation, reportedLocations } = useLocation();
  

  const handleReportNow = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        addReportedLocation(location);
        console.log("hiiiihihih");
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      }
    );
  };

  const handleViewHeatmap = () => {
    // Navigate to the heatmap page, you can add your logic here
    navigate("/heatmap");
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-black flex flex-col pl-12 pr-12 max-md:px-5" style={backgroundImageStyle}>
      <div className="bg-black bg-opacity-50 self-stretch flex flex-col mt-11 mb-10 pt-20 pb-72 px-20 rounded-[69px] max-md:max-w-full max-md:my-10 max-md:pb-24 max-md:px-5">
        <div className="self-center flex mb-0 w-[819px] max-w-full flex-col max-md:mb-2.5">
          <div className="text-white text-7xl font-bold self-center whitespace-nowrap max-md:max-w-full max-md:text-4xl">
            WANDERWOOF
          </div>
          <div className="text-white text-xl font-bold self-center whitespace-nowrap mt-10">
            mapping the path to rescue
          </div>
          <div className="self-stretch flex w-full items-start justify-between gap-5 mt-96 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <div className="flex flex-col flex-1">
              <div className="bg-zinc-300 self-stretch flex w-full grow flex-col px-20 py-9 rounded-3xl max-md:px-5 report">
                <div className="text-black text-xl font-bold self-center whitespace-nowrap">
                  <button className="report" onClick={handleReportNow}>
                    Report Now
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="bg-zinc-300 self-stretch flex w-full grow flex-col px-20 py-9 rounded-3xl max-md:px-5 heatmap">
                <div className="text-black text-xl font-bold self-center whitespace-nowrap">
                  <button className="heatmap" onClick={handleViewHeatmap}>
                    View Heat Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;
