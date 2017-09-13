import React, { Component } from 'react';
import { articleMounting, getProduct } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleProduct from '../single_product.js';

class PricingCustom extends Component {
	componentWillMount() {
		// if an invoice is passed in via something like  http://localhost:3000/pricing/custom/?invoice=9982688840
		// pass it along to getProduct
		const invoice = (this.props.location.search.includes('invoice=')) ? this.props.location.search.substr(9) : undefined;
		this.props.articleMounting("pricing"); 
		this.props.getProduct(invoice, this.props.siteConfig.shopify);
	}
	render() {
		return (
			<article className="pricing-custom">
				<SingleProduct />
			</article>
		);
	}
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, getProduct }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (PricingCustom);