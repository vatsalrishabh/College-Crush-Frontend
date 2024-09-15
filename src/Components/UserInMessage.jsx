import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const now = new Date();
  const lastSeenDate = new Date(date);

  // Get the difference in days between the current date and the lastSeenDate
  const diffTime = Math.abs(now - lastSeenDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // If today
    return lastSeenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } else if (diffDays === 1) {
    // If yesterday
    return 'Yesterday';
  } else {
    // If more than a day ago
    return lastSeenDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  }
};

const UserInMessage = (props) => {
  // Determine the display status based on the lastSeenOnlineStatus
  const displayStatus = props.lastSeenOnlineStatus === 'online'
    ? 'Online'
    : formatDate(props.lastSeenTime);

  // console.log("Display status: " + props.lastSeenOnlineStatus);

  return (
    <>
      <Link to={`user/${props.email}`}>
        <div className='user-in-message text-white flex items-center justify-between p-4 bg-[#36292a] rounded-lg shadow-lg m-1'>
          
          {/* Profile Picture */}
          <div className="dp mr-4">
            <img 
              src={props.dp} 
              alt="Profile" 
              className='w-12 h-12 rounded-full border-2 border-[#fe2c73]' 
            />
          </div>
          
          {/* Name and Last Message */}
          <div className="message-info flex-grow">
            <h2 className="text-lg font-semibold text-white">{props.name}</h2>
            <h3 className="text-sm text-[#fe2c73]">{props.lastMessage}</h3>
          </div>
          
          {/* Last Seen */}
          <div className="last-seen text-right">
            <h3 className="text-xs text-[#fe5b3b]">{displayStatus}</h3>
          </div>
          
        </div>
      </Link>
    </>
  );
}

export default UserInMessage;
