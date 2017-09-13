import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row } from 'react-bootstrap';
import ContactForm from '../contact_form';
import ContactMap from '../contact_map';

class Contact extends Component {
	componentWillMount() {
		this.props.articleMounting("contact"); 
	}
	componentDidMount() {
		document.getElementById('contact-environment').innerHTML 
			= `<div name="airvisual_widget" key="BuP3B6D4SfDcsnGwX"></div>`;
	 	 this.script = document.createElement("script");
     this.script.type = "text/javascript";
     this.script.src = "https://airvisual.com/scripts/widget_v2.0.js"; 
     document.getElementsByTagName("head")[0].appendChild(this.script);
	}
	componentWillUnmount(){
		document.getElementById('contact-environment').innerHTML = "";
    this.script.parentNode.removeChild(this.script);
	}
	render() {
		return (
			<article className="contact">
	     	<Grid>
	        <Row className="show-grid">
	          <Col sm={6}> 
	          	<ContactForm /> 
	          </Col>
	          <Col className="contact-info" sm={6}>
        			<p className="contact-details">
        				160 S Linden Ave Suite 220, South San Francisco, CA 94080<br />
						(415) 409-9389 
						<span className="contact-restriction"> (Sessions By Appointment Only)  </span>
						<a href="mailto:info@sweetlightstudios.com"> mailto: info@sweetlightstudios.com </a>	
					</p>
								<ContactMap />
								<div id="contact-environment" />
	          </Col>
	        </Row>
	      </Grid>
			</article>
		);
	}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(null, mapDispatchToProps) (Contact);
