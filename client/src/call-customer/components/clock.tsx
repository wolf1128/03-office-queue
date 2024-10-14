import React, { useState, useEffect } from 'react';
import '../call-customer.css';


function Clock() {
  const [time, setTime] = useState(new Date());

  // Function to format time as HH:mm:ss
  const formatTime = (date: any) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='time-box'>
      <span className='time-text'>Time: </span>
      <span className='time-number'>{formatTime(time)}</span>
    </div>
  );
}

export default Clock
