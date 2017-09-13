import React, { Component } from 'react';
import { articleMounting, getCollectionProducts } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleCollectionProduct from '../single_collection_product.js';

class PricingSpecialOffers extends Component {
		componentWillMount() {
		const collection = (this.props.location.search.includes('collection=')) ? this.props.location.search.substr(12) : "445421192";	
		this.props.articleMounting("pricing"); 
		this.props.getCollectionProducts(collection, this.props.siteConfig.shopify);
	}
	render() {
		return (
			<article className="pricing-special-offers">
				<SingleCollectionProduct />
			</article>
		);
	}
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, getCollectionProducts }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (PricingSpecialOffers);
