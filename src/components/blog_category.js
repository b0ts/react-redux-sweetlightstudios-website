import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';

const BlogCategory = ({ id, name, count, linkBy }) => (
	<div>
    <LinkContainer 
      className='blog-category-link' to={ '/blog/category/' + linkBy + '/page/1/' } >
      <NavItem className="blog-item" eventKey={ id } >
        &bull; { name } 
      	<span className='blog-category-count'> ({ count })</span>
      </NavItem>
    </LinkContainer>
   </div>
 );
export default BlogCategory;
