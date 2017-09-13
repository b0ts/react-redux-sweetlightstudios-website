import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SlickCarousel from '../slick_carousel';

class Makeovers extends Component {
		componentWillMount() {
		this.props.articleMounting("makeovers"); 
	}
	render() {
		return (
			<article className="makeovers">
				<SlickCarousel />
			</article>
		);
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(null, mapDispatchToProps) (Makeovers);

