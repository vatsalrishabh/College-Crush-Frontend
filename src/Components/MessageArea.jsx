import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import CustomSyncLoader from './CustomSyncLoader';

// Badge styling for online status
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

// MessageArea component
const MessageArea = (props) => {
  // State to hold messages
  const [messages, setMessages] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(props.loggedInUser); // Get logged-in user from props
  const [sentTo, setSentTo] = useState(props.sentTo); // Get recipient from props
  const [istyping,setTyping] = useState(false);

  // useEffect to update messages whenever props.allmessages changes
  useEffect(() => {
    if (props.allmessages) {
      setMessages(props.allmessages); // Update the messages with props data
    }
  }, [props.allmessages]); // Trigger whenever props.allmessages changes

  return (
    <div className="Message-Area h-full overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-item flex items-start mb-4 ${
            msg.sentFrom === loggedInUser ? 'justify-end' : ''
          }`}
        >
          {msg.sentFrom !== loggedInUser && (
            <div className="avatar-holder mr-2">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt={msg.name} src={msg.avatar} />
              </StyledBadge>
            </div>
          )}

          <Paper
            elevation={3}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sentFrom === loggedInUser ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {msg.message}
          </Paper>

          {msg.sentFrom === loggedInUser && (
            <div className="avatar-holder ml-2">
              <Avatar alt={msg.name} src={msg.avatar} />
            </div>
          )}
        </div>
      ))}

    <div className="3dots-loader ">
         <CustomSyncLoader
          size={15} 
          color="#ff4458" 
          loading={istyping} 
          speedMultiplier={0.8} 
          />
    </div>
     
    </div>
  );
};

export default MessageArea;
