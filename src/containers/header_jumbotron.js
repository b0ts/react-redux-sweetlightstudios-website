import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { Jumbotron, Image } from 'react-bootstrap';
import NotificationBanner from '../components/notification_banner';

class HeaderJumbotron extends Component {
	render() {
		const banner = (this.props.article) ? this.props.siteConfig.header[this.props.article] : null;
		var jumboImage = (this.props.siteConfig) ? this.calculateJumbotronImageName() : "";
		return (
			<header>
				<Jumbotron>
					<NotificationBanner 
						bannerText = {(banner) ? banner.bannerText : ""}
						bannerLink = {(banner) ? banner.bannerLink : ""}
					/>
		    	<Image src={ jumboImage } responsive />
		  	</Jumbotron>
	  	</header>
		);
	}
	calculateJumbotronImageName() {
		const header = this.props.siteConfig.header; // DRY
	  const julianDay = this.getJulianDay();
	  const extension = julianDay % header.logoImageCount;
	  return this.props.siteConfig.imageCDN 
	  	+ header.logoBaseImage.slice(0,-7) 
	  	+ ("000" + extension).slice(-3) 
	  	+ header.logoBaseImage.slice(-4);
	}
	getJulianDay() { // day count from beginning of year
	  const date = new Date();
	  const month = date.getMonth();
	  const year = date.getFullYear();
	  let days = date.getDate();
	  for (let i = 0; i < month; i++) {
	      days += new Date(year, i+1, 0).getDate();
	  }
	  return days;
	}
}

const mapStateToProps = (state) => ({ article: state.article, siteConfig: state.siteConfig });
export default connect(mapStateToProps) (HeaderJumbotron);

