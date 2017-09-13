import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import Slider from 'react-slick';
import SlickCarouselItem from '../components/slick_carousel_item';

class SlickCarousel extends Component {
  render() {
    return (!this.props.article) ? (<div></div>) :
      ( <div>
          <Slider {...this.props.siteConfig.carousel.settings}>
            {this.renderCarouselItems()}
          </Slider>
        </div>
    );
  };
  renderCarouselItems() {
    return this.props.siteConfig.carousel[this.props.article].map((gridItem) => {
      return (
        <div key={gridItem.eventKey}>
          <SlickCarouselItem 
            image = {this.props.siteConfig.imageCDN + gridItem.image} 
            altText = {gridItem.altText} />
        </div>
      );
    });
  }
};

const mapStateToProps = (state) => ({ article: state.article, siteConfig: state.siteConfig });
export default connect(mapStateToProps) (SlickCarousel);
