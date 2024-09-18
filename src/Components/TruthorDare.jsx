import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './TruthorDare.css'; // Ensure to import the CSS file

const TruthorDare = () => {
  const [start, setStart] = useState('');
  const [answer, setAnswer] = useState('');

  const startTheGame = () => {
    setStart('hidden');
    // Game start logic can go here if needed
  };

  return (
    <>
      {/* Welcome Message */}
      <div className={`${start} Truth-or-Dare text-white h-[84vh] flex flex-col items-center justify-center`}>
        <h1 className='animated-text'>
          Let's Play Truth or Dare!
        </h1>
        <div className="invite fade-in">
          <p className='invite-text'>
            Ready to spice up your party? Gather your friends and get ready for some fun challenges and deep secrets.
            Click below to start the game!
          </p>
          <div className='p-2'>
            {/* Removed unnecessary code for buttons and modals */}
          </div>
          <Link to="/postQue">
            <button className='start-button'>
              Start Game !
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TruthorDare;
