import React, { Component } from 'react';
import { articleMounting, blogGetMostRecentPost, changeSiteConfigLanguage } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Well } from 'react-bootstrap';
import PhotoGrid from '../photo_grid';

class Home extends Component {
	// willReceiveProps - called when the router is sending to the same component
 componentWillReceiveProps(nextProps) { 
 		if (nextProps.location.pathname.includes('/fr/') !== this.props.location.pathname.includes('/fr/')){
 			this.props.changeSiteConfigLanguage('fr');
 			window.location.reload(); 
 		}
 		if (nextProps.location.pathname.includes('/en/') !== this.props.location.pathname.includes('/en/')){
 			this.props.changeSiteConfigLanguage('en');
 			window.location.reload();
 		}
	 	if (nextProps.siteConfig 
	 		&& this.props.siteConfig.blog.domain !== nextProps.siteConfig.blog.domain) {
	 		this.props.blogGetMostRecentPost(nextProps.siteConfig.blog.domain);
	 	};
	 };
	//  willMount called when the router switches components	
	componentWillMount() {
		if (this.props.location.pathname.includes('/fr/')) {
			this.props.changeSiteConfigLanguage('fr')
		}
		if (this.props.location.pathname.includes('/en/')) {
			this.props.changeSiteConfigLanguage('en');
		}
		this.props.articleMounting("home"); 
		this.props.blogGetMostRecentPost(this.props.siteConfig.blog.domain);
	};
	render() {
		return (
			<article className="home">
				<PhotoGrid />
				{this.getBlogTickler()}
			</article>
		);
	}
	getBlogTickler() {
		if (!this.props.recentPost) {
			return ( <Well bsSize="small"></Well> );
		}
		const postTitle = (this.props.recentPost.posts) 
			? this.props.recentPost.posts[0].title
			: this.props.recentPost[0].title.rendered; 
		return (
			<div>
        <LinkContainer to={ '/blog/page/1/' }>
         	<Well bsSize="small">{postTitle}</Well>
		 		</LinkContainer>
		 	</div>
		 );
	};
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig, recentPost: state.recentPost });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting, blogGetMostRecentPost, changeSiteConfigLanguage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (Home);
