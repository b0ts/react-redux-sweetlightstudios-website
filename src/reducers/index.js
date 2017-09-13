import { combineReducers } from 'redux';
import Article from './article_reducer';
import SiteConfig from './site_config_reducer';
import AirQuality from './air_quality_reducer';
import ProductReducer from './product_reducer';
import CollectionProductsReducer from './collection_products_reducer';
import CartReducer from './cart_reducer';
import BlogPostReducer from './blog_post_reducer';
import BlogRecentPostReducer from './blog_recent_post_reducer';
import BlogPostsReducer from './blog_posts_reducer';
import BlogPostCountReducer from './blog_post_count_reducer';
import BlogCategoriesReducer from './blog_categories_reducer';

const rootReducer = combineReducers({
  article: Article,
  siteConfig: SiteConfig,
  airQuality: AirQuality,
  product: ProductReducer,
  collectionProducts: CollectionProductsReducer,
  cart: CartReducer,
  post: BlogPostReducer,
  recentPost: BlogRecentPostReducer,
  posts: BlogPostsReducer,
  postCount: BlogPostCountReducer,
  categories: BlogCategoriesReducer,
});

export default rootReducer;