import React from 'react';
import './TruthorDare.css'; // Ensure to import the CSS file

const TruthorDare = () => {
  return (
    <div className='Truth-or-Dare text-white h-[84vh] flex flex-col items-center justify-center'>
      <h1 className='animated-text'>
        Let's Play Truth or Dare!
      </h1>
      <div className="invite fade-in">
        <p className='invite-text'>
          Ready to spice up your party? Gather your friends and get ready for some fun challenges and deep secrets. 
          Click below to start the game!
        </p>
        <button className='start-button'>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default TruthorDare;
