import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from "../context/loginContext";
import InfoIcon from '@mui/icons-material/Info';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Mid.css'; // Import the CSS file

const Mid = () => {
  const handleRipple = (event) => {
    const { loggedInUser } = useAuth(); //have toc continur from here
    const { email } = useParams();
    const ripple = document.createElement('span');
    const size = Math.max(event.target.clientWidth, event.target.clientHeight);
    const rect = event.target.getBoundingClientRect();

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';

    event.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // Remove ripple after the animation
  };

  return (
    <div className='h-[84vh]'>

     


{/* all the list only */}
      <div className="card bg-gray-900 h-full text-white p-2">
        
        {/* 1st horizontals section starts */}
        <div className="slider mb-4">
          <div className="pagination flex justify-center space-x-2">
            {/* Thin horizontal lines for pagination */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`w-10 h-1 bg-gray-500 rounded-full ${index === 0 ? 'bg-white' : ''}`}
              ></div>
            ))}
          </div>
        </div>
        {/* 1st horizontals section ends */}

        {/* 2nd Horizontal section starts */}
        <div className="dps mb-4 flex justify-center">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfh5YombU3zpbejYqzLMsem9bwDm7yO-6hw&s"
    alt="Profile"
    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover rounded-lg"
  />
</div>


        {/* 2nd Horizontal section ends */}

        {/* 3rd horizontal section starts */}
        <div className="Name-College-infoIcon flex justify-between items-center mb-4">
          <div className="Name-College w-4/5">
            <div className="name text-2xl font-bold">DeadPool</div>
            <div className="College text-gray-400">Garden City University</div>
          </div>
          <div className="infoIcon w-1/5 flex justify-end">
            <InfoIcon className="text-white" />
          </div>
        </div>
        {/* 3rd horizontal section ends */}

        {/* 4th horizontal section starts */}
        <div className="RejectLikeConfess flex justify-around">
          <div className="Reject ripple-parent" onClick={handleRipple}>
            <CancelIcon className="text-red-600" style={{ fontSize: '40px' }} />
          </div>
          <div className="Confess ripple-parent" onClick={handleRipple}>
            <VolunteerActivismIcon className="text-pink-600" style={{ fontSize: '40px' }} />
          </div>
          <div className="Love ripple-parent" onClick={handleRipple}>
            <FavoriteIcon className="text-red-500" style={{ fontSize: '40px' }} />
          </div>
        </div>
        {/* 4th horizontal section ends */}
        
      </div>
{/* all the list ends */}


    </div>
  );
};

export default Mid;
