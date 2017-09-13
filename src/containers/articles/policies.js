import React, { Component } from 'react';
import { articleMounting, getProduct } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleProduct from '../single_product.js';

class Policies extends Component {
	componentWillMount() {
		this.props.articleMounting("policies"); 
		this.props.getProduct('10658318984', this.props.siteConfig.shopify);
	}
	render() {
		return (
			<article className="policies">
				<SingleProduct />
			</article>
		);
	}
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, getProduct }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (Policies);