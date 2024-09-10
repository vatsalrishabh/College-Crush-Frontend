import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

const MessageTopNav = () => {
  // State to handle the dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div className="Name-Lastseen">
          <div className="Name font-semibold text-white">Remy Sharp</div>
          <div className="lastseen text-sm text-gray-200">Last seen 2 hours ago</div>
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
          <span className="material-icons">
<SettingsApplicationsIcon/>
          </span>
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default MessageTopNav;
