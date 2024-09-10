import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ForumIcon from '@mui/icons-material/Forum';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Bottom = () => {
  // State to track the active icon
  const [activeIcon, setActiveIcon] = useState(null);

  // Function to handle icon click
  const handleIconClick = (icon) => {
    setActiveIcon(icon); // Update active icon on click
  };

  return (
    <div className='bg-gray-900 h-[8vh] flex justify-around items-center text-white pb-5'>
    
    <Link to="/swipep">
      <div onClick={() => handleIconClick('whatshot')}>
        <WhatshotIcon sx={{ color: activeIcon === 'whatshot' ? '#ff4458' : 'gray', fontSize: 34 }} />
      </div>
      </Link>


      <div onClick={() => handleIconClick('emojiEvents')}>
        <EmojiEventsIcon sx={{ color: activeIcon === 'emojiEvents' ? '#ff4458' : 'gray', fontSize: 34 }} />
      </div>


      <div onClick={() => handleIconClick('star')}>
        <StarIcon sx={{ color: activeIcon === 'star' ? '#ff4458' : 'gray', fontSize: 34 }} />
      </div>

<Link to="../message">
      <div onClick={() => handleIconClick('forum')}>
        <ForumIcon sx={{ color: activeIcon === 'forum' ? '#ff4458' : 'gray', fontSize: 34 }} />
      </div>
      </Link>

      
    </div>
  );
};

export default Bottom;
