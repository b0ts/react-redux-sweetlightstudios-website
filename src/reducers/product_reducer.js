import { GET_PRODUCT } from '../actions/index.js';
export default (state = null, action) => 
	(action.type === GET_PRODUCT && action.payload) ? action.payload : state;
