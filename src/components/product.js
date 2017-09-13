import React from 'react';
import { Route } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Image, Button } from 'react-bootstrap';
import ProductOptions from './product_options';

const Product = ({ product, updateProduct }) => {
  const selectedVariant = (product) ? product.selectedVariant : null; // DRY
  const getImage = () => {
    return (product && product.selectedVariantImage) ? (
      <Image className = "product-image" 
        src= { product.selectedVariantImage.src } 
        alt= { product.title } />
      ) : (<p></p>);
  };
  const getPrice = () => {
    return (product && selectedVariant.attrs.variant.price !== "0.00") ? (
      <p className = "product-cost" >Cost: {selectedVariant.price} (tax computed at checkout)</p>
      ) : (<p></p>);
  };
  const buyIt = (history, checkoutUrl) => {
    history.push('/thank-you/');
    window.open(checkoutUrl);
  };
  const getButton = () => {
    return (product && selectedVariant.attrs.variant.price !== "0.00") ? (
      <p>
        <Route render={({ history}) => (
          <Button 
            bsStyle="primary" 
            className='product-buy-button' 
            onClick = { () => buyIt(history, selectedVariant.checkoutUrl(1)) } 
            > 
          Buy Now! 
          </Button>
        )} />
      </p>
      ) : (<p></p>);
  };
  return (!product) ? (<div></div>) : ( 
    <div className = "product-info" data-product-id = "{ product.product_id }">
      { getImage() }
      <h1 className = "product-title">{ product.title }</h1>
      <div className = "product-description">{ Parser(product.attrs.body_html) }</div>
      <ProductOptions className = "product-options" 
        product = { product }
        updateProduct = { updateProduct } / >
      { getPrice() }
      { getButton() }
    </div>
  );
};
export default Product;
