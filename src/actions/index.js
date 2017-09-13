import axios from 'axios'; // note: exported as lowercase axios
import ShopifyBuy from 'shopify-buy';
const ARTICLE_MOUNTING = 'article_mounting';
const CHANGE_SITE_CONFIG_LANGUAGE = 'change_site_config_language';
const AIR_QUALITY = 'air_quality';
const GET_PRODUCT = 'get_product';
const GET_COLLECTION_PRODUCTS = 'get_collection_products';
const SHOPPING_CART = 'shopping_cart';
const BLOG_POST = 'blog_post';
const BLOG_RECENT_POST = 'blog_recent_post';
const BLOG_POSTS = 'blog_posts';
const BLOG_POST_COUNT = 'blog_post_count';
const BLOG_CATEGORIES = 'blog_categories';

const articleMounting = (article) => ({ type: ARTICLE_MOUNTING, payload: article });
const changeSiteConfigLanguage = (language) => ({ type: CHANGE_SITE_CONFIG_LANGUAGE, payload: language });

const getAirQuality = () => ({
		type: AIR_QUALITY,
		payload: axios.get("http://api.airvisual.com/v2/nearest_city?lat=37.642516&lon=-122.414485&key=yXCfYx532dKMZGEQQ"),
	});

const getProduct = (productNum = "9970402120", shopify) => ({
  type: GET_PRODUCT,
  payload: getShopClient(shopify).fetchProduct(productNum, shopify.accessToken, shopify.domain, shopify.appId),
});

const getCollectionProducts = (collectionId = "445421192", shopify) => ({
	type: GET_COLLECTION_PRODUCTS,
	payload: getShopClient(shopify).fetchQueryProducts({
    collection_id: collectionId, 
    sort_by: 'collection-default'
  }),
});

const getShopClient = (shopify) => ShopifyBuy.buildClient({
  accessToken: shopify.accessToken,
  domain: shopify.domain,
  appId: shopify.appId
});

// Shopping Cart
const createShoppingCart = (shopify) => (localStorage.getItem(shopify.accessToken)) ? ({
			type: SHOPPING_CART,
			payload: getShopClient(shopify).fetchCart(localStorage.getItem(shopify.accessToken))
		}) : ({
			type: SHOPPING_CART,
			payload: getShopClient(shopify).createCart()
	});

const cartDeleteAll = (cart)  => ({
	type: SHOPPING_CART,
	payload: cart.clearLineItems()
});

const cartAddVariant = (cart, variant)  => {
	const lineItem = getItemInCart(cart, variant);
	let quantity = lineItem ? lineItem.quantity + 1 : 1;
	return (!lineItem) ? cartCreateLineItem(cart, variant, quantity) : cartUpdateItem(cart, lineItem, quantity);
};

const cartAddItem = (cart, lineItem)  => {
	let quantity = lineItem ? lineItem.quantity + 1 : 1;
	return cartUpdateItem(cart, lineItem, quantity);
};

const cartRemoveItem = (cart, lineItem) => {
  let quantity = lineItem ? lineItem.quantity - 1 : 0;
  return cartUpdateItem(cart, lineItem, quantity);
};

const cartUpdateItem = (cart, cartLineItem, quantity) => {
	return (!quantity) ? cartRemoveLineItem(cart, cartLineItem) : cartUpdateLineItem(cart, cartLineItem, quantity); 
}

const getItemInCart = (cart, variant) => cart.lineItems.find((item)=> item.variant_id === variant.id);

const cartCreateLineItem = (cart, variant, quantity = 1) => {
	return ({
		type: SHOPPING_CART,
		payload: cart.createLineItemsFromVariants({
			variant,
			quantity
		})
	});
};

const cartRemoveLineItem = (cart, cartLineItem) => ({
	type: SHOPPING_CART,
	payload: cart.removeLineItem(cartLineItem.id)
});

const cartUpdateLineItem = (cart, cartLineItem, quantity) => ({
	type: SHOPPING_CART,
	payload: cart.updateLineItem(cartLineItem.id, quantity)
});

// blog
const blogGetMostRecentPost = (domain) => {
	return ({
		type: BLOG_RECENT_POST,
		payload: axios.get(domain + 'posts/?number=1')
	});
};

const blogGetPost = (domain, postID, embed = '') => ({
	type: BLOG_POST,
	payload: axios.get(domain + 'posts/' + postID + embed)
});

const blogGetPosts = (libVer, domain, category = '', page = '1') => {
	// v1 v2 changes
	const catSearch = (libVer === 'v2') ? '?categories=' : '?category=';
	const embed = (libVer === 'v2') ? '&_embed' : '';

	const url = (category === '') 
		? (domain + "posts/?page=" + page + embed)
		: (domain + 'posts/' + catSearch + category + '&page=' + page + embed); 
	return {
	  type: BLOG_POSTS,
	  payload: axios.get(url)
	};
};

const blogGetPostCountV2 = (domain, category = '') => {
	const url = (category === '') 
		? (domain + 'posts?per_page=1&_embed')
		: (domain + 'posts?categories=' + category + '&per_page=1&_embed'); 
	return {
	  type: BLOG_POST_COUNT,
	  payload: axios.get(url)
	}
};

const blogGetCategories = (domain) => ({
	type: BLOG_CATEGORIES,
	payload: axios.get(domain + 'categories/?per_page=40')
});

export { 
	ARTICLE_MOUNTING, articleMounting,
	CHANGE_SITE_CONFIG_LANGUAGE, changeSiteConfigLanguage,
	AIR_QUALITY, getAirQuality,
	GET_PRODUCT, getProduct,
	GET_COLLECTION_PRODUCTS, getCollectionProducts,
	SHOPPING_CART, createShoppingCart, cartDeleteAll, cartAddVariant, cartAddItem, cartRemoveItem, cartUpdateItem,
	BLOG_POST, blogGetPost, 
	BLOG_RECENT_POST, blogGetMostRecentPost,
	BLOG_POSTS, blogGetPosts, 
	BLOG_POST_COUNT, blogGetPostCountV2,
	BLOG_CATEGORIES, blogGetCategories
};
