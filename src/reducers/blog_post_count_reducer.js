import { BLOG_POST_COUNT } from '../actions/index.js';
const BlogPostCountReducer = (state = null, action) => 
	(action.type === BLOG_POST_COUNT && action.payload.headers['x-wp-total']) 
		? action.payload.headers['x-wp-total'] : state;
export default BlogPostCountReducer;
