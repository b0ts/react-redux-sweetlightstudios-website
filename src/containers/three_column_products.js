import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { bindActionCreators } from 'redux';
import { cartAddVariant } from '../actions/index.js';
import { Grid, Row, Col } from 'react-bootstrap';
import GridProduct from '../components/grid_product';

class ThreeColumnProducts extends Component {
  updateProduct = (product, offset) => {
    if (this.props.collectionProducts) {
      let collectionProducts = this.props.collectionProducts;
      collectionProducts[offset] = product;
      this.setState({ collectionProducts });
    };
  };
  cartAddVariant = (product) => {
    this.props.cartAddVariant(this.props.cart.cartContents, product.selectedVariant);
  };
  render() {
    return (!this.props.collectionProducts) ? (<div></div>) : ( 
      <div id="three-column-products" >
        <Grid>
          <Row className="show-grid">
            {this.renderGridColumns()}
          </Row>
        </Grid>
      </div>
    );
  };
  renderGridColumns() {
    const addToCart = (this.props && this.props.addToCart) ? this.props.addToCart : false; 
    return this.props.collectionProducts.map((product, offset) => {
      return (
        <Col key = {product.attrs.title} sm={4} >
          <GridProduct
            product = { product }
            offset = {offset}
            updateProduct = {this.updateProduct}
            addToCart = {addToCart} 
            cartAddVariant = {this.cartAddVariant}
            />
        </Col>
      );
    });
  };
};
 // what to hook up from reducers/index.js
const mapStateToProps = (state) => ({ collectionProducts: state.collectionProducts, cart: state.cart});
const mapDispatchToProps = (dispatch) => bindActionCreators({ cartAddVariant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (ThreeColumnProducts);
