import { BLOG_POST } from '../actions/index.js';
const BlogPostReducer = (state = null, action) => 
	(action.type === BLOG_POST && action.payload.data) ? action.payload.data : state;
export default BlogPostReducer;
