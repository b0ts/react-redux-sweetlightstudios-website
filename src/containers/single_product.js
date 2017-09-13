import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import Product from '../components/product';

class SingleProduct extends Component {
  updateProduct = (product) => {
    if (this.props.product) {
       this.setState({ product }); 
    };
  };
  render() {
    return (!this.props.product) ? (<div></div>) : ( 
      <div className = "single-collection-product" >
        <Product 
          product = { this.props.product }
          updateProduct = {this.updateProduct} 
        />
      </div>
    );
  };
}
const mapStateToProps = (state) => ({ product: state.product });
export default connect(mapStateToProps) (SingleProduct);