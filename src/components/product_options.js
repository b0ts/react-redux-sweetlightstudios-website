import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const ProductOptions = ({ product, updateProduct, offset=0 }) => {
  const renderOptionName = (optionName) => (optionName.includes('*')) 
      ? ( <a href="#linktoblurb">{ optionName }</a> )
      : ( <div> { optionName } </div>);  
  const renderOptionValues = (values) => {
    return values.map((value) => (
      <option key={value} value={value}>{value}</option>
    )
  )};
  const renderOptions = () => {
    return product.options.map((option, index) => {
      // "Title" is placeholder when there are no options, so don't display
      return (option.name === "Title") ? (<div key={option.name}></div>) : ( 
        <FormGroup className="option-item" key={option.name} controlId="formControlsSelect">
          <ControlLabel className="option-title">{renderOptionName(option.name)}</ControlLabel>
          <FormControl className="option-selection pull-right" componentClass="select" placeholder="select"
            onChange={ (e) => { 
              product.options[index].selected = e.target.value;
              updateProduct(product, offset);
            } } >
            { renderOptionValues(option.attrs.values) }
          </FormControl>
        </FormGroup>
      );
    });
  };
  return (
    <div>
      { renderOptions() }
    </div>
  );
};
export default ProductOptions;
