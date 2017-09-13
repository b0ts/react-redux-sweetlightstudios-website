import { GET_COLLECTION_PRODUCTS } from '../actions/index.js';
export default (state = null, action) => 
	(action.type === GET_COLLECTION_PRODUCTS && action.payload) ? action.payload : state;
