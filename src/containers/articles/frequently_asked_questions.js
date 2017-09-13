import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Parser from 'html-react-parser';
import { Parallax, Background } from 'react-parallax';
import { Image } from 'react-bootstrap';

class FrequentlyAskedQuestions extends Component {
		componentWillMount() {
		this.props.articleMounting("frequently-asked-questions"); 
	}
	render() {
		return (
			<article className="frequently-asked-questions">
				<Parallax strength={200}>
					<Background>
						<Image 
							className="parallax-image" 
							src={this.props.siteConfig.imageCDN + this.props.siteConfig.faq.image}
							alt={this.props.siteConfig.faq.title} 
						/>
					</Background>
					<h1 className="faq-title" >{this.props.siteConfig.faq.title}</h1>
					<div className="faq-copy" >{Parser(this.props.siteConfig.faq.copy.join(''))}</div>
        </Parallax>
			</article>
		);
	}
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps) (FrequentlyAskedQuestions);
