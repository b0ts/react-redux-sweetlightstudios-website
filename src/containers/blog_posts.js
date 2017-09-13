import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import Parser from 'html-react-parser';
import { LinkContainer } from 'react-router-bootstrap';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';

class BlogPosts extends Component {
  render() {
    if (!this.props.posts) {
      return (<div></div>);
    }
    return (
     <div className="blog-items" >
        <ListGroup>
          {this.renderBlogPosts()}
        </ListGroup>
      </div>
    )
  };
  renderBlogPosts() {
    if (this.props.posts.posts) { //v1
      const posts = this.props.posts.posts; // DRY
      return posts.map((post, index) => {
        const excerptText = JSON.stringify(post.excerpt);
        const excerpt = excerptText.substring(1, excerptText.length-3);
        return (this.getHtml(
          post.ID,
          (post.featured_image) ? post.featured_image : '',
          post.title,
          excerpt 
          )
        );
      });
    };
    const posts = this.props.posts; // DRY
    return posts.map((post, index) => {
      return (this.getHtml(
        post.id, 
        (post._embedded['wp:featuredmedia']) 
          ? post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url : '',
          post.title.rendered,
          post.excerpt.rendered
        )
      );
    });
  };
  getHtml(id, imageSrc, title, excerpt) {
    return (
      <LinkContainer className="blog-posts-link" key={id} to={ "/blog/post/" + id + '/'}>
        <ListGroupItem className="blog-posts-list-item">
          {this.getImage(imageSrc, title)}
          <h2 className="blog-posts-title">{ Parser(title) }</h2>
          <div className="blog-posts-excerpt">{Parser(excerpt)}</div>
        </ListGroupItem>
      </LinkContainer>
    );   
  };
  getImage(imageSrc, title) {
    return (imageSrc === "") 
      ? (<div></div>) 
      : (<div className="blog-posts-image-div">
          <Image className="blog-posts-image" src={imageSrc} alt={title} />
        </div>
      );
  };
};

const mapStateToProps = (state) => ({ posts: state.posts });
export default connect(mapStateToProps) (BlogPosts);

