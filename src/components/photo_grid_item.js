import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Thumbnail } from 'react-bootstrap';

const PhotoGridItem = ({ title, link, image, altText }) => (
  <Col className = "photo-grid-item" sm={6} md={3}>
  	<LinkContainer to={link} className="link">
      <Thumbnail
        src={image} 
        alt={altText}>
        <p className="photo-grid-title text-center">{title}</p>
      </Thumbnail>  
    </ LinkContainer>
  </Col>
 );
export default PhotoGridItem;
