import React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

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

// Mock message data for demonstration
const messages = [
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },

  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    name: 'John Doe',
    message: 'Hey, how are you?',
    side: 'left', // Represents incoming messages
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    name: 'You',
    message: 'I am good, how about you?',
    side: 'right', // Represents outgoing messages
  },
];

const MessageArea = () => {
  return (
    <div className="Message-Area h-full overflow-y-auto p-4">

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-item flex items-start mb-4 ${
            msg.side === 'right' ? 'justify-end' : ''
          }`}
        >
          {msg.side === 'left' && (
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
              msg.side === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {msg.message}
          </Paper>

          {msg.side === 'right' && (
            <div className="avatar-holder ml-2">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt={msg.name} src={msg.avatar} />
              </StyledBadge>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
