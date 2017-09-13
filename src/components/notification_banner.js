import React from 'react';
import { Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const NotificationBanner = ( {bannerText, bannerLink} ) => (
	<div className="NotificationBanner">
		<LinkContainer to={bannerLink}>
  		<Well bsSize="small">{bannerText}</Well>
  	</LinkContainer>
	</div>
);
export default NotificationBanner;
