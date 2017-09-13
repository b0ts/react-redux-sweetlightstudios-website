import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveEmbed, Image, Grid, Row, Col } from 'react-bootstrap';
import Parser from 'html-react-parser';
import Reveal from 'react-reveal';
import '../../animate.css';

class Credits extends Component {
		componentWillMount() {
		this.props.articleMounting("credits"); 
	};
	render() {
		return (
			<article className="credits">
				<h1 className="credits-title">{this.props.siteConfig.credits.title}</h1>
				<div className="credits-vid">
    			<ResponsiveEmbed a16by9>
        		<iframe 
        			title="slsvid" 
        			className="embed-responsive-item" 
        			src={this.props.siteConfig.credits.vid}>
      			</iframe>
	    		</ResponsiveEmbed>
	    	</div>
	     	<Grid>
	    		{this.rollCredits()}
	      </Grid>
			</article>
		);
	};
	rollCredits() {
		return this.props.siteConfig.credits.roll.map((credit, index) => {
			let image = (credit.image.includes("http")) 
				? credit.image 
				: (this.props.siteConfig.imageCDN + credit.image);
			return (
				<Row className="credit-row" key={credit.title} >
					<a href={credit.link}>
		        <Col className="credit-column" sm={6}> 
							<Reveal effect={"animated " + credit.leftAnimation} >
	          		<Image className="credit-image" src={image} alt={credit.alt} responsive/>
							</Reveal>
		        </Col>
		        <Col className="credit-column" sm={6}>
			        <Reveal effect={"animated " + credit.rightAnimation} >
	          		<h2 className="credit-title" >{credit.title}</h2>
	          		<p className="credit-details" >{Parser(credit.details.join(''))}</p>
							</Reveal>
		        </Col>
		      </a>
		      <hr className="credit-separator" />
				</Row>
			);
		});
	};
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (Credits);
