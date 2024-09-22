import React, { useEffect, useState } from 'react';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const DisLikedIt = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);  // Start the animation when the component mounts
    const timer = setTimeout(() => setAnimate(false), 1500); // End animation after 1.5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className={`disliked-it-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${animate ? 'animate-disliked' : 'opacity-0'}`}>
      <ThumbDownAltIcon sx={{ color: 'red', fontSize: 60 }} />
    </div>
  );
};

export default DisLikedIt;
