import { BLOG_RECENT_POST } from '../actions/index.js';
const BlogRecentPostReducer = (state = null, action) => 
	(action.type === BLOG_RECENT_POST && action.payload.data) ? action.payload.data : state;
export default BlogRecentPostReducer;
