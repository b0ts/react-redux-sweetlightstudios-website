import { SHOPPING_CART } from '../actions/index.js';

export default (state = null, action) => {
	if (action.type === SHOPPING_CART && action.payload) {
		localStorage.setItem(action.payload.config.accessToken, action.payload.id);
		return {
			productCount: action.payload.attrs.line_items.reduce((acc, obj) => acc + obj.quantity, 0),
			cartContents: action.payload
		};
	}
	return state;
};
