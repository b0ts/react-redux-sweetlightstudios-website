import React, {Component} from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { cartAddItem, cartRemoveItem, cartUpdateItem } from '../actions/index.js';
import { Image, Button, FormControl } from 'react-bootstrap';

class CartItem extends Component {
  incrementItem = () => this.props.cartAddItem(this.props.cart.cartContents, this.props.lineItem);
  decrementItem = () => this.props.cartRemoveItem(this.props.cart.cartContents, this.props.lineItem);
  modifyItem = (event) => this.props.cartUpdateItem(this.props.cart.cartContents, this.props.lineItem, event.target.value);

  render() {
    const lineItem = this.props.lineItem;
    const cartItemTitle = lineItem.title;
    var cartItemVariantTitle = lineItem.variant_title;
    if (cartItemVariantTitle === 'Default Title') {
      cartItemVariantTitle = ''; 
    }
    let cartItemPrice = this.formatAsMoney(lineItem.line_price);
    return (
      <div className="cart-item" key={lineItem.variant_id} data-variant-id="{lineItem.variant_id}">
        <Image className="cart-item-image" src={lineItem.image.src} responsive />
        <div className="cart-item-content">
          <h2 className="cart-item-title">{cartItemTitle}</h2>
          <p className="cart-item-variant-title">{cartItemVariantTitle}</p>
          <p className="cart-item-value">
            <Button className="cart-item-decrement-button" onClick={this.decrementItem}>-</Button>
            <FormControl 
              className="cart-item-quantity" 
              type="number"
              value={lineItem.quantity} 
              onChange={this.modifyItem}
            />
            <Button className="cart-item-increment-button" onClick={this.incrementItem}>+</Button>
            <span className="cart-item-price">{cartItemPrice}</span>
          </p>
        </div>
      </div>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ cartAddItem, cartRemoveItem, cartUpdateItem }, dispatch);
export default connect(null, mapDispatchToProps) (CartItem);
