import React from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from '../assets/video/intro.mp4';

const Loader = () => {
  const navigate = useNavigate();

  // Handler for when the video ends
  const handleVideoEnd = () => {
    navigate('/home');
  };

  // Handler for skipping the video
  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video
        controls
        onEnded={handleVideoEnd} // Navigate to /home when the video ends
        style={{ width: '100%', height: 'auto' }}
      >
        <source src={Intro} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={handleSkip}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        Skip Video
      </button>
    </div>
  );
};

export default Loader;
