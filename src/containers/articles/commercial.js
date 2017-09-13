import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SlickCarousel from '../slick_carousel';

class Commercial extends Component {
		componentWillMount() {
		this.props.articleMounting("commercial"); 
	}
	render() {
		return (
			<article className="commercial">
				<SlickCarousel />
			</article>
		);
	}
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(null, mapDispatchToProps) (Commercial);

