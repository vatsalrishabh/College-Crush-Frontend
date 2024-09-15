import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from "../context/loginContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import moment from 'moment'; // Make sure to install moment using `npm install moment`

const MessageTopNav = (props) => {
  const { logout } = useAuth(); 
  const { email } = useParams();
  const [lastSeen, setLastSeen] = useState('');
  const [onlineStatus, setOnlineStatus] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Fetch lastSeen status
  useEffect(() => {
    const fetchLastSeen = async () => {
      try {
        const response = await axios.get(`${BaseUrl}api/students/${email}`);
        setLastSeen(response.data.lastSeen || 'Unknown');
        setOnlineStatus(response.data.onlineStatus);
      } catch (error) {
        console.error('Error fetching last seen status:', error);
      }
    };

    fetchLastSeen();
  }, [email]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    logout();
  };

  // Format lastSeen date in Indian format (DD-MM-YYYY HH:mm:ss)
  const formattedLastSeen = lastSeen ? moment(lastSeen).format('DD-MM-YYYY HH:mm:ss') : 'Unknown';

  return (
    <div className='Message-TopNav flex items-center justify-between p-4 bg-[#ff4458] text-white'>
      {/* Back icon */}
      <Link to="../message">
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </Link>

      {/* Avatar and name */}
      <div className='flex items-center'>
        <div className="avatar-holder mr-3">
          <Avatar alt="User Avatar" src={props.dp} />
        </div>
        <div className="Name-Lastseen">
          <div className="Name font-semibold text-white">{props.name}</div>
          <div className="lastseen text-sm text-gray-200">
            {onlineStatus === 'online' ? onlineStatus : formattedLastSeen}
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      <div className='dropdown-menu'>
        <IconButton
          aria-label="more options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <SettingsApplicationsIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem> */}
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default MessageTopNav;
