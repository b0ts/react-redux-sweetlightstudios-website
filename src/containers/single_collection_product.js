import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import Product from '../components/product';

class SingleCollectionProduct extends Component {
  updateProduct = (product) => {
       if (this.props.collectionProducts) {
      // never modify this.props directly
      let collectionProducts = this.props.collectionProducts;
      collectionProducts[0] = product;
      this.setState({ collectionProducts });
    }
  };
  render() {
    return (this.props.collectionProducts) ? ( 
      <div className = "single-collection-product" >
        <Product 
          product = { this.props.collectionProducts[0] }
          updateProduct = {this.updateProduct} 
        />
      </div>
    ) : (<div></div>);
  };
}
const mapStateToProps = (state) => ({ collectionProducts: state.collectionProducts });
export default connect(mapStateToProps) (SingleCollectionProduct);
