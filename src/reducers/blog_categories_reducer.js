import { BLOG_CATEGORIES } from '../actions/index.js';
const BlogCategoriesReducer = (state = null, action) => 
	(action.type === BLOG_CATEGORIES && action.payload.data) ? action.payload.data : state;
export default BlogCategoriesReducer;
