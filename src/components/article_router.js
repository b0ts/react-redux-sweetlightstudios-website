import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/articles/home';
import LovedOnes from '../containers/articles/loved_ones';
import Branding from '../containers/articles/branding';
import Makeovers from '../containers/articles/makeovers';
import Commercial from '../containers/articles/commercial';
import Blog from '../containers/articles/blog';
import BlogPost from '../containers/articles/blog_post'; 
import PricingSpecialOffers from '../containers/articles/pricing_special_offers';
import PricingCollection from '../containers/articles/pricing_collection';
import PricingCollectionCart from '../containers/articles/pricing_collection_cart';
import PricingCustom from '../containers/articles/pricing_custom';
import FrequentlyAskedQuestions from '../containers/articles/frequently_asked_questions';
import Policies from '../containers/articles/policies';
import Contact from '../containers/articles/contact';
import Credits from '../containers/articles/credits';
import ThankYou from '../containers/articles/thank_you';

const ArticleRouter = () => {
  return (
    <article className="ArticleRouter">
      <div>
      	<Switch>
      		<Route path="/home/" component={Home} />
      		<Route path="/loved-ones/" component={LovedOnes} />
      		<Route path="/branding/" component={Branding} />
      		<Route path="/makeovers/" component={Makeovers} />
      		<Route path="/commercial/" component={Commercial} />
      		<Route path="/blog/post/" component={BlogPost} />
      		<Route path="/blog/" component={Blog} />
      		<Route path="/pricing/special-offers/" component={PricingSpecialOffers} />
      		<Route path="/pricing/custom/" component={PricingCustom} />
      		<Route path="/pricing/commercial-online/" component={PricingCollectionCart} />
      		<Route path="/pricing/" component={PricingCollection} />
      		<Route path="/faq/" component={FrequentlyAskedQuestions} /> 
          <Route path="/policies/" component={Policies} />           
          <Route path="/contact/" component={Contact} />
          <Route path="/credits/" component={Credits} />
          <Route path="/thank-you/" component={ThankYou} />    
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </article>
  );
};
export default ArticleRouter;
