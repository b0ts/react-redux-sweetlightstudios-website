import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import CartItem from './cart_item';

class CartItems extends Component {
  updateProduct = (product, offset) => {
    if (this.props.collectionProducts) {
      let collectionProducts = this.props.collectionProducts;
      collectionProducts[offset] = product;
      this.setState({ collectionProducts });
    };
  };
  render() {
    return (!this.props.cart) ? (<div></div>) : ( 
      <div className="cart-items" >
        <ListGroup>
          {this.renderCartItems()}
        </ListGroup>
      </div>
    );
  };
  renderCartItems() {
    return this.props.cart.cartContents.lineItems.map((lineItem, index) => {
      return (
        <ListGroupItem key={lineItem.variant_id} >
          <CartItem 
            lineItem = { lineItem }
            cart = { this.props.cart }
          />
        </ListGroupItem>
      );
    });
  };

};
 // what to hook up from reducers/index.js
const mapStateToProps = (state) => ({ cart: state.cart });
export default connect(mapStateToProps) (CartItems);
