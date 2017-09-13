import React from 'react';
import { Route } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Thumbnail, Button } from 'react-bootstrap';
import ProductOptions from './product_options';

const GridProduct = ({ product, updateProduct, offset=0, addToCart=false, cartAddVariant=null }) => {
  const getButton = () => (addToCart) ? getAddToCartButton() : getBuyItNowButton();
  const buyIt = (history, checkoutUrl) => {
    history.push('/thank-you/');
    window.open(checkoutUrl);
  };
  const getBuyItNowButton = () => (product && product.selectedVariant.attrs.variant.price !== "0.00") ? (
    <div>
      <Route render={({ history}) => (
        <Button 
          bsStyle="primary" 
          className='product-grid-buy-button' 
          onClick = { () => buyIt(history, product.selectedVariant.checkoutUrl(1)) } > Buy Now! 
        </Button>
      )} />  
    </div>
    ) : (<div></div>);
  const getAddToCartButton = () => (product && product.selectedVariant.attrs.variant.price !== "0.00") ? (
     <div>
       <Button bsStyle="primary" className='add-to-cart-button' 
         onClick = { () => cartAddVariant(product) } > 
         Add To Cart 
       </Button>
     </div>
    ) : (<div></div>);

  return (
    <div className = "product-grid">
      <Thumbnail className = "product-grid-image" 
        src={ product.selectedVariantImage.src } alt={product.title}>
        <h1 className = "product-grid-title">{ product.title }</h1>
        <div className = "product-grid-description" >{ Parser(product.attrs.body_html) }</div>
         <ProductOptions className = "product-grid-options" 
          product = { product }
          updateProduct = { updateProduct } 
          offset = { offset }/ >
        <p className = "product-grid-cost" >Cost: {product.selectedVariant.price} (tax computed at checkout)</p>
        { getButton() }
      </Thumbnail>
    </div>
   );
};
export default GridProduct;

