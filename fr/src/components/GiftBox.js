import React from 'react';

const GiftBox = ({ rating, onClick }) => (
  <div className="gift-box" onClick={onClick}>
    <img src="gift-box-image.png" alt="Gift Box" />
    {rating !== null && <div className="rating">{rating} ★</div>}
  </div>
);

export default GiftBox;
