import React, { Component } from 'react';
import { articleMounting, blogGetPost } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Parser from 'html-react-parser';
import BlogCategories from '../blog_categories';
import { Grid, Row, Col, Image } from 'react-bootstrap';

class BlogPost extends Component {
	// willReceiveProps - called when the router is sending to the same component
	componentWillReceiveProps(nextProps) { 
		(this.props.location.pathname !== nextProps.location.pathname) 
			&& this.props.blogGetPost(
					this.props.siteConfig.blog.domain, 
					this.getIntVal(this.props.location.pathname, '/post/', null),
					(this.props.siteConfig.blog.domain.includes('v2')) ? '?_embed' : ''
			);
	};
	//  willMount called when the router switches components
	componentWillMount() {
		this.props.articleMounting("blog");

		this.props.blogGetPost(
			this.props.siteConfig.blog.domain, 
			this.getIntVal(this.props.location.pathname, '/post/', null),
			(this.props.siteConfig.blog.domain.includes('v2')) ? '?_embed' : ''
		)
	};
	getIntVal(pathname, search, def) {
		return (pathname.includes(search))
		? parseInt(pathname.slice((pathname.indexOf(search) + search.length), -1),10)
		: def;
	}
	render() {
		if (!this.props.post || !this.props.post.content) {
	 		return (<div></div>);
	 	};
		return (this.props.post.content.rendered)
			? (this.renderArticle( //v2
				(this.props.post._embedded['wp:featuredmedia']) 
					? this.props.post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : '',
				this.props.post.title.rendered,
				this.props.post.content.rendered
			)) 
			: (this.renderArticle( //v1
				(this.props.post.featured_image) ? this.props.post.featured_image : '',
				this.props.post.title,
				this.props.post.content
			));
	};

	renderArticle(imageSrc, title, content) {
		return (
			<article className="blog-post">
	     	<Grid>
	        <Row className="blog-grid">
	          <Col sm={5} md={4} > <BlogCategories blog={this.props.siteConfig.blog} /> </Col>
	          <Col className="blog-col-2" sm={7} md={8} >
	          	<Image src={ imageSrc } 
	          		alt={title} responsive />
		        	<h1 className="blog-post-title"> { Parser(title) } </h1>
							<div> { Parser(content) } </div>
	          </Col>
	        </Row>
	      </Grid>
			</article>
		);
	};
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig, post: state.post });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, blogGetPost }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (BlogPost);
