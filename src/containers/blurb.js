import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { Jumbotron } from 'react-bootstrap';

class Blurb extends Component {
	render() {
		return ( // no blurbs info in config, then don't show blurb
			(this.props.siteConfig.blurbs[this.props.article] === undefined)
			? (<div></div>)
			: (
				<article>
					<Jumbotron>
						<a name="linktoblurb"> </a>
						<h1 className="blurb-headline">{(this.props.article) ? this.props.siteConfig.blurbs[this.props.article].headline : ""}</h1>
						{ this.copyLineItems() }
			  	</Jumbotron>
		  	</article>
			)
		);
	};
	copyLineItems() {
		return (this.props.article) ? (
			<p className = "blurb-copy">
				{ this.props.siteConfig.blurbs[this.props.article].copy.map(this.copyLineItem) }
			</p>
		) : ( <div></div> );
	};


	copyLineItem(line, index) {
		return (
			<span key={index}>{line}<br /></span>
		)
	}; 
}
const mapStateToProps = (state) => ({ article: state.article, siteConfig: state.siteConfig });
export default connect(mapStateToProps) (Blurb);
