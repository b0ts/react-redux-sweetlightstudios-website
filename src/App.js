import React, { Component } from 'react';
import HeaderJumbotron from './containers/header_jumbotron';
import NavMenu from './containers/nav_menu';
import ArticleRouter from './components/article_router';
import FooterBanners from './containers/footer_banners';
import Blurb from './containers/blurb';

// App is a class component to allow it to hold state
class App extends Component {

  render() {
    return(
      <div className="App Theme">
        <HeaderJumbotron />
        <NavMenu /> 
        <ArticleRouter /> 
        <FooterBanners /> 
        <Blurb />
      </div>
    );
  }
}
export default App;