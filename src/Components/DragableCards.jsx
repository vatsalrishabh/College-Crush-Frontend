import React, { useState } from 'react';

const DraggableCards = ({ userDetails }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setDragging(true);
    const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const y = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setStartPosition({ x, y });
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: position.x + (x - startPosition.x),
      y: position.y + (y - startPosition.y),
    });

    setStartPosition({ x, y });
  };

  const stopDrag = () => {
    setDragging(false);
  };

  return (
    <div
      className="dps mb-4 flex justify-center h-[60vh] overflow-hidden relative"
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onTouchStart={startDrag}
      onTouchMove={onDrag}
      onTouchEnd={stopDrag}
      style={{
        cursor: dragging ? 'grabbing' : 'grab',
        transform: `translateX(${position.x}px)`,
        transition: dragging ? 'none' : 'transform 0.2s ease',
      }}
    >
      <img
        src={userDetails.dp}
        alt="Profile"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover rounded-lg"
      />
    </div>
  );
};

export default DraggableCards;
