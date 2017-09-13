import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { bindActionCreators } from 'redux';
import { blogGetCategories } from '../actions/index.js';
import { Navbar, Nav } from 'react-bootstrap';
import BlogCategory from '../components/blog_category';

class BlogCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {navExpanded: false}; 
  }
  componentWillMount() {
    this.props.blogGetCategories( this.props.blog.domain );
  };
  onNavbarToggle = () => {
    this.setState({navExpanded: !this.state.navExpanded});
  };
  onNavItemClick = () => {
    this.setState({ navExpanded: false });
  }
  render() {
    return (this.props.categories) 
      ? (
      <nav className="blog-catagories">
        <Navbar default expanded={ this.state.navExpanded } onToggle={ this.onNavbarToggle }>
            <Navbar.Header >
              <Navbar.Brand >
                <h2 className="blog-categories-title">{this.props.siteConfig.blog.categoriesTitle}</h2>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav bsStyle="pills" stacked activeKey={2} onClick={ this.onNavItemClick } >
                {this.renderBlogCategories(this.props.categories, this.closeNav)}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </nav>
    ) : (<div></div>);
  };
  renderBlogCategories(categories, closeNav) {  
    if (categories.categories) { 
      return (categories.categories.map((category, index) => { // v1
        return (category.name === 'Uncategorized')
          ? null
          : (
            <BlogCategory 
              key={category.ID} 
              id={category.ID} 
              name={category.name} count={category.post_count} 
              linkBy={category.name}
            />
          );
      }));
    };
    return (categories.map((category, index) => { // v2
      return (category.name === 'Uncategorized')
        ? null
        : (
          <BlogCategory 
            key={category.id} 
            id={category.id} 
            name={category.name} 
            count={category.count} 
            linkBy={category.id}/>
        );
    })); 
  };
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig, categories: state.categories });
const mapDispatchToProps = (dispatch) => bindActionCreators({ blogGetCategories }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (BlogCategories);
