import React, { Component } from 'react';
import { articleMounting, getCollectionProducts, createShoppingCart } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreeColumnProducts from '../three_column_products';
import ShoppingCart from '../shopping_cart';

class PricingCollectionCart extends Component {
	// willReceiveProps - called when the router is sending to the same component
	componentWillReceiveProps(nextProps) { 
  	(nextProps.location.pathname.includes('/pricing/')) 
  	&& nextProps.articleMounting(nextProps.location.pathname.slice(9, -1)); 
		(nextProps.location.search !== this.props.location.search
			&& nextProps.location.search.includes('collection=')) 
			&& this.props.getCollectionProducts(nextProps.location.search.substr(12), this.props.siteConfig.shopify);
		this.props && this.props.createShoppingCart(this.props.siteConfig.shopify);
	};
	//  willMount called when the router switches components
        componentWillMount() {
  	(this.props.location.pathname.includes('/pricing/')) 
  		&& this.props.articleMounting(this.props.location.pathname.slice(9, -1)); 
		(this.props.location.search.includes('collection='))
			&& this.props.getCollectionProducts(this.props.location.search.substr(12), this.props.siteConfig.shopify);
		this.props && this.props.createShoppingCart(this.props.siteConfig.shopify);		
	};
	render() {
		return (
			<article className="pricing-collection">
				<ThreeColumnProducts addToCart={true}/>
				<ShoppingCart />
			</article>
		);
	};
};
const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ articleMounting, getCollectionProducts, createShoppingCart }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (PricingCollectionCart);
