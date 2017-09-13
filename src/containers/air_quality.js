import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { Button } from 'react-bootstrap';

class AirQuality extends Component {
	render() {
		return (
			<div>
				{this.getAqi()}
		  </div>
		);
	};

	getAqi() {
		if (!this.props.airQuality) {
			return (
				<Button id="air-quality-button"
					href="https://airnow.gov/index.cfm?action=airnow.local_city&mapcenter=0&cityid=317">
						Air Quality Index at Air Now
				</Button>
		)};
		const quality = this.props.airQuality.data.current.pollution.aqius;
		const type = this.props.airQuality.data.current.pollution.mainus;
		const airQuality = this.props.siteConfig.airQuality;
		const aqis = [
			{index: 50, text: airQuality.goodText, className:"good"},
			{index: 100, text: airQuality.moderateText, className:"moderate"},
		 	{index: 150, text: airQuality.usgText, className:"usg"},
		 	{index: 200, text: airQuality.unhealthyText, className:"unhealty"},
		 	{index: 300, text: airQuality.veryText, className:"very-unhealthy"},
		 	{index: 500, text: airQuality.hazardousText, className:"hazardous"}
		 ]
		 const mainPollutants = { 
			"p2": "PM2.5", //pm2.5 small particles
    	"p1": "PM10", //pm10 larger particles
    	"o3": "Ozone", //Ozone O3
    	"n2": "NO2", //Nitrogen dioxide NO2 
    	"s2": "SO2", //Sulfur dioxide SO2 
    	"co": "CO" //Carbon monoxide CO 
    }	
		const current = aqis.find((aqi) => (quality <= aqi.index));
		return(
			<Button 
				className={current.className} id="air-quality-button"
				href="https://airnow.gov/index.cfm?action=airnow.local_city&mapcenter=0&cityid=317">
				{ airQuality.labelText } { quality } { current.text } { mainPollutants[type] }
			</Button>
		);
	};

}
const mapStateToProps = (state) => ({ airQuality: state.airQuality, siteConfig: state.siteConfig });
export default connect(mapStateToProps) (AirQuality);
