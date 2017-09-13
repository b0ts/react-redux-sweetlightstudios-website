import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { Grid, Row } from 'react-bootstrap';
import PhotoGridItem from '../components/photo_grid_item';

class PhotoGrid extends Component {
	render() {
		return (
			<div>
				<Grid>
			    <Row className="show-grid">
						{this.renderGridColumns()}
			    </Row>
			  </Grid>
			</div>
		);
	}
	renderGridColumns() {
		return this.props.siteConfig.photoGrid[this.props.article].map((gridColumn) => {
			return (
			<PhotoGridItem 
				key = {gridColumn.eventKey}
				title = {gridColumn.title}
				link = {gridColumn.link} 
				image = {this.props.siteConfig.imageCDN + gridColumn.image} 
				altText = {gridColumn.altText} />
			);
		});
	}
}

const mapStateToProps = (state) => ({ article: state.article, siteConfig: state.siteConfig });
export default connect(mapStateToProps) (PhotoGrid);

