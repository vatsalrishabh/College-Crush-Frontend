import React from 'react';
import {Link} from 'react-router-dom'

const UserInMessage = (props) => {
  return (

<>

<Link to={`user/${props.email}`} >
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
        <h3 className="text-xs text-[#fe5b3b]">{props.lastSeen}</h3>
      </div>

    </div>
</Link>


</>

  
  );
}

export default UserInMessage;
