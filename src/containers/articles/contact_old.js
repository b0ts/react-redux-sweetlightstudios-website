import React, { Component } from 'react';
import { articleMounting, getAirQuality } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row } from 'react-bootstrap';
import ContactForm from '../contact_form';
import AirQuality from '../air_quality';
import ContactMap from '../contact_map';

class Contact extends Component {
		componentWillMount() {
		this.props.articleMounting("contact"); 
		this.props.getAirQuality();
	}
	render() {
		return (
			<article className="contact">
	     	<Grid>
	        <Row className="show-grid">
	          <Col sm={6}> <ContactForm /> </Col>
	          <Col className="contact-info" sm={6}>
		          <AirQuality />
	          	<ContactMap />
        			<p className="contact-details">
        				160 S Linden Ave Suite 220, South San Francisco, CA 94080<br />
								(415) 409-9389 
								<span className="contact-restriction"> (Sessions By Appointment Only) </span></p>
	          </Col>
	        </Row>
	      </Grid>
			</article>
		);
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, getAirQuality }, dispatch);
export default connect(null, mapDispatchToProps) (Contact);

