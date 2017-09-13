import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SlickCarousel from '../slick_carousel';

class Branding extends Component {
		componentWillMount() {
		this.props.articleMounting("branding"); 
	}
	render() {
		return (
			<article className="branding">
				<SlickCarousel />
			</article>
		);
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(null, mapDispatchToProps) (Branding);

