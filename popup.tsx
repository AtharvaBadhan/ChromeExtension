import React, { useState } from 'react';
import axios from 'axios';

const Popup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ country: string; city: string } | null>(null);

  const handleShowLocation = async () => {
    setIsLoading(true);
  
    try {
      // Step 1: Get user's IP address using Axios
      const ipResponse = await axios.get('https://api64.ipify.org?format=json');
      const ipData = ipResponse.data;
  
      // Extract the user's IP address
      const ip = ipData.ip;
  
      // Step 2: Get country and city from IP address using Axios
      const accessToken = process.env.REACT_APP_IPINFO_TOKEN;
      const locationResponse = await axios.get(`https://ipinfo.io/${ip}/json?token=${accessToken}`);
      const locationData = locationResponse.data;
  
      // Step 3: Parse and display location
      const { country, city } = locationData;
      setLocation({ country, city });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  
    setIsLoading(false);
  };
  
  return (
    <div className="popup">
      <button
        className={`btn ${isLoading ? 'btn-loading' : ''}`}
        onClick={handleShowLocation}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Show my location'}
      </button>
      {location && (
        <p>Your country is {location.country} and city is {location.city}</p>
      )}
    </div>
  );
};

export default Popup;
