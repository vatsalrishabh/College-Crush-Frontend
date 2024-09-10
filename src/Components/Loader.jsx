import React from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from '../assets/video/intro.mp4';

const Loader = () => {
  const navigate = useNavigate();

  // Handler for when the video ends
  const handleVideoEnd = () => {
    navigate('/home');
  };

  return (
    <div>
      <video
        controls
        onEnded={handleVideoEnd} // Navigate to /home when the video ends
        style={{ width: '100%', height: 'auto' }}
      >
        <source src={Intro} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
