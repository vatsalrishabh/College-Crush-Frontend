import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const LikedIt = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);  // Start the animation as soon as the component mounts
    const timer = setTimeout(() => setAnimate(false), 1500); // Reset animation after 1.5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className={`liked-it-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${animate ? 'animate-liked' : 'opacity-0'}`}>
      <ThumbUpIcon sx={{ color: 'green', fontSize: 60 }} />
    </div>
  );
};

export default LikedIt;
