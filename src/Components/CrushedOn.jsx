import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CrushedOn = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);  // Start animation on component mount
    const timer = setTimeout(() => setAnimate(false), 1500);  // End animation after 1.5 seconds

    return () => clearTimeout(timer);  // Clean up timer on unmount
  }, []);

  return (
    <div className={`crushed-on-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${animate ? 'animate-crushed' : 'opacity-0'}`}>
      <FavoriteIcon sx={{ color: 'gold', fontSize: 60 }} />
    </div>
  );
};

export default CrushedOn;
