import React, { useState } from 'react';
import GiftBox from './GiftBox';
import './GiftSlider.css'; // Create CSS file for styling

const GiftSlider = () => {
  const [ratings, setRatings] = useState(Array(7).fill(null)); // 7 gift boxes

  const openGift = (index) => {
    const newRatings = [...ratings];
    newRatings[index] = Math.floor(Math.random() * 6); // Random rating between 0-5
    setRatings(newRatings);
  };

  return (
    <div className="gift-slider">
      {ratings.map((rating, index) => (
        <GiftBox key={index} rating={rating} onClick={() => openGift(index)} />
      ))}
    </div>
  );
};

export default GiftSlider;
