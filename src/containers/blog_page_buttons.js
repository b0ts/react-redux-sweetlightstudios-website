import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';

class BlogPageButtons extends Component {
  render() {
    if ((this.props.blogApiVersion === 'v2' && !this.props.postCount)
      || (this.props.blogApiVersion === 'v1' && !this.props.posts))
      return (<div></div>);
    const pageCount = (this.props.blogApiVersion === 'v2') 
      ? Math.ceil(this.props.postCount/10) : Math.ceil(this.props.posts.found/20);
    if (pageCount < 2) {
      return (<div></div>);
    }
    return (
      <div className="blog-page-buttons">
        <span className="blog-page-buttons-title">Page: </span>
        {this.renderButtons(pageCount)}
      </div>
    ); 
  };
  renderButtons(pageCount) {
    let buttons = [];
    for (var i = 1; i <= pageCount; i++) {
      let link = this.removeFromPath(this.props.pathname, '/page/') + 'page/' + i + '/';
      buttons.push(
        <LinkContainer key={i} to={link}>
          <Button>{i}</Button>
        </LinkContainer>
      );
    }
    return (
      <ButtonGroup>
        {buttons} 
      </ButtonGroup>
    );
  };
  removeFromPath(pathname, search) {
    return (pathname.includes(search))
    ? pathname.slice(0, pathname.indexOf(search) + 1)
    : pathname;
  }
};
const mapStateToProps = (state) => ({ posts: state.posts, postCount: state.postCount});
export default connect(mapStateToProps) (BlogPageButtons);
