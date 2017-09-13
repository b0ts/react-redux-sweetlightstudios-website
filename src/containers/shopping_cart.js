import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { Route } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import CartItems from './cart_items';
import ShoppingCartIcon from '../components/shopping_cart_icon';

class ShoppingCart extends Component {
  open = () => {
    this.setState({ showModal: true });
  };
  close = () => {
    this.setState({ showModal: false });
  };
  buyIt = (history, checkoutUrl) => {
    history.push('/thank-you/');
    window.open(checkoutUrl);
  };
  constructor(props) {
    super(props);
    this.state = {showModal: false}; 
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.cart && this.props.cart.productCount !== nextProps.cart.productCount) {
       this.open();
    }
  };
  render() {
    const productCount = (this.props.cart && this.props.cart.productCount) ? (this.props.cart.productCount) : 0;
    return (
      <div>
        <ShoppingCartIcon 
          productCount = {productCount}
          open = { () => this.open() }
        />
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title className="cart-title">Sweet Light Studios Shopping Cart</Modal.Title>
          </Modal.Header>
          { this.getBody() }
          { this.getFooter() }
        </Modal>
      </div>
    );
  };
  getBody() {
    return (this.props.cart && this.props.cart.productCount > 0) ? ( 
      <Modal.Body>
        <CartItems />
      </Modal.Body>
    ) : (
      <Modal.Body>
        <h1 className="cart-empty">Empty Cart</h1>
        <h2 className="cart-empty">Please Purchase an Item</h2>
      </Modal.Body>
    )
  };
  getFooter() {
    return (this.props.cart && this.props.cart.productCount > 0) ? ( 
      <Modal.Footer>
          <p className="cart-info">
            <span className="cart-total-label">TOTAL:</span> 
            <sup className="cart-info-moniker">USD </sup>
            <span className ="cart-total">
              { this.formatAsMoney(this.props.cart.cartContents.subtotal) }
            </span>
          </p>
        <div className="cart-discount-notice">Please provide prepaid return shipping - applicable tax added at checkout.</div>
        <Route render={({ history}) => (
          <Button 
            bsStyle="primary" 
            className='cart-checkout-button' 
            onClick = { () => this.buyIt(history, this.props.cart.cartContents.checkoutUrl) } 
            > Checkout 
          </Button>
        )} />
      </Modal.Footer>
    ) : (
      <div></div>
    );
  };

  // Format amount as currency - from the cart demo 
  formatAsMoney(amount, currency, thousandSeparator, decimalSeparator, localeDecimalSeparator) {
    currency = currency || '$';
    thousandSeparator = thousandSeparator || ',';
    decimalSeparator = decimalSeparator || '.';
    localeDecimalSeparator = localeDecimalSeparator || '.';
    var regex = new RegExp('(\\d)(?=(\\d{3})+\\.)', 'g');

    return currency + parseFloat(amount, 10).toFixed(2)
      .replace(localeDecimalSeparator, decimalSeparator)
      .replace(regex, '$1' + thousandSeparator)
      .toString();
  };

};
const mapStateToProps = (state) => ({ cart: state.cart });
export default connect(mapStateToProps) (ShoppingCart);
