import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { bindActionCreators } from 'redux';
import { cartDeleteAll } from '../actions/index.js';
import { Button } from 'react-bootstrap';

class SimpleShoppingCart extends Component {
  // componentWillReceiveProps(nextProps) {
  //   (this.props.cart && this.props.cart.productCount !== nextProps.cart.productCount) &&
  //     this.alertCartContents();
  // };
  
  render() {
    const productCount = (this.props.cart && this.props.cart.productCount > 0) ? this.props.cart.productCount : 0;
    return (!this.props.cart) ? (<div></div>) : ( 
      <div className = "shopping cart" >
        <Button onClick={() => this.alertCartContents()}>{productCount} Show Cart </Button>
        <Button onClick={ () => this.checkout() }>Checkout</Button>
        <Button onClick={() => this.deleteCart()}>Delete</Button>
      </div>
    );
  };
  deleteCart() {
    this.props.cartDeleteAll(this.props.cart.cartContents);
  };
  checkout() {
    (this.props.cart.cartContents.lineItems.length < 1) 
      ? this.alertCartContents()
      : window.open(this.props.cart.cartContents.checkoutUrl, '_self');
  };
  // Display the cart items into an alert box
  alertCartContents() {
    const contents = this.props.cart.cartContents;
    let results = '';
    if (contents.lineItems.length < 1) {
      results = 'No items in cart!\n';
    }
    for(let i = 0; i < contents.lineItems.length; i++) {
      let lineItem = contents.lineItems[i];
      results += 'Cart Line Item #' + i + '\n';
      results += 'Title: ' + lineItem.title + '\n';
      if (lineItem.variant_title !== 'Default Title') {
        results += 'Variant Title: ' + lineItem.variant_title + '\n';
      }
      results += 'Image Source: ' + lineItem.image.src + '\n';
      results += 'Quantity: ' + lineItem.quantity + '\n';
      results += 'line item Total: $' + lineItem.line_price + '\n\n';
    };
    results += 'Total: $' + contents.subtotal + '\n\n';
    results += '(Tax and Shipping Calculated during checkout)';
    alert(results); 
  };
};
const mapStateToProps = (state) => ({ cart: state.cart });
const mapDispatchToProps = (dispatch) => bindActionCreators({ cartDeleteAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (SimpleShoppingCart);
