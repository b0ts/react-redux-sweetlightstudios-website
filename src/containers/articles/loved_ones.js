import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SlickCarousel from '../slick_carousel';

class LovedOnes extends Component {
		componentWillMount() {
		this.props.articleMounting("loved-ones"); 
	}
	render() {
		return (
			<article className="loved-ones">
				<SlickCarousel />
			</article>
		);
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(null, mapDispatchToProps) (LovedOnes);
