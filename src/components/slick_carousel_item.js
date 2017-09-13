import React from 'react';

const SlickCarouselItem = ({ image, altText }) => (
  <div className="slick-grid-item">
    <img className="slick-grid-image"
      draggable="false" 
      src={image} 
      alt={altText} >
    </img>
  </div>
);
export default SlickCarouselItem;

