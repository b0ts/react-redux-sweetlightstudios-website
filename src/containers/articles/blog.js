import React, { Component } from 'react';
import { articleMounting, blogGetPosts, blogGetPostCountV2 } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BlogPosts from '../blog_posts';
import BlogCategories from '../blog_categories';
import BlogPageButtons from '../blog_page_buttons';
import { Grid, Row, Col } from 'react-bootstrap';

class Blog extends Component {
	// willReceiveProps - called when the router is sending to the same component
	componentWillReceiveProps(nextProps) { 
		if (this.props.location.pathname === nextProps.location.pathname) {
			return;
		}
		if (this.props.siteConfig.blog.domain.includes('v2')) {
			this.props.blogGetPostCountV2(
				this.props.siteConfig.blog.domain,
				this.getVal(this.removeFromPath(nextProps.location.pathname, '/page/'), '/category/', ''), 
			);
		};
		this.props.blogGetPosts( 
			(this.props.siteConfig.blog.domain.includes('v2')) ? 'v2' : 'v1',
			this.props.siteConfig.blog.domain, 
			this.getVal(this.removeFromPath(nextProps.location.pathname, '/page/'), '/category/', ''), 
			this.getVal(nextProps.location.pathname, '/page/', '1')
		);
	};
	//  willMount called when the router switches components
	componentWillMount() {
		this.props.articleMounting("blog"); 
		if (this.props.siteConfig.blog.domain.includes('v2')) {
			this.props.blogGetPostCountV2(
				this.props.siteConfig.blog.domain,
				this.getVal(this.removeFromPath(this.props.location.pathname, '/page/'), '/category/', ''), 
			);
		};
		this.props.blogGetPosts( 
			(this.props.siteConfig.blog.domain.includes('v2')) ? 'v2' : 'v1',
			this.props.siteConfig.blog.domain, 
			this.getVal(this.removeFromPath(this.props.location.pathname, '/page/'), '/category/', ''), 
			this.getVal(this.props.location.pathname, '/page/', '1')
		);
	};
	getVal(pathname, search, def) {
		return (pathname.includes(search))
		? pathname.slice((pathname.indexOf(search) + search.length), -1)
		: def;
	}
	removeFromPath(pathname, search) {
		return (pathname.includes(search))
		? pathname.slice(0, pathname.indexOf(search) + 1)
		: pathname;
	}
	render() {
		return (
			<article className="blog">
				<h1 className="blog-title">{this.props.siteConfig.blog.title}</h1>
	     	<Grid>
	        <Row className="blog-grid">
	          <Col sm={5} md={4} > <BlogCategories blog={this.props.siteConfig.blog} /> </Col>
	          <Col className="blog-posts-col" sm={7} md={8} >
		        	<BlogPosts 
								blog={this.props.siteConfig.blog}
							/>
							<BlogPageButtons 
								blogApiVersion={ (this.props.siteConfig.blog.domain.includes('v2')) ? 'v2' : 'v1' }
								pathname={this.props.location.pathname} 
							/>
	          </Col>
	        </Row>
	      </Grid>
			</article>
		);
	}
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, blogGetPosts, blogGetPostCountV2 }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (Blog);
