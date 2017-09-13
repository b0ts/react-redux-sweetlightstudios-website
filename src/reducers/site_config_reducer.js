// we import a const to keep naming in sync 
import { CHANGE_SITE_CONFIG_LANGUAGE } from '../actions/index';
import SiteConfig from '../configs/site_config';

// the default is english 'en' - calling changeSiteConfigLanguage will change the config
const SiteConfigReducer = (state = SiteConfig('en'), action) => 
	(action.type === CHANGE_SITE_CONFIG_LANGUAGE && action.payload) ? SiteConfig(action.payload) : state;
export default SiteConfigReducer;
