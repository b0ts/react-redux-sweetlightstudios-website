import { BLOG_POSTS } from '../actions/index.js';
const BlogPostsReducer = (state = null, action) => 
	(action.type === BLOG_POSTS && action.payload.data) ? action.payload.data : state;
export default BlogPostsReducer;
