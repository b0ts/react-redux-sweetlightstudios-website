import siteConfigEn from './site_config_en.json';
import siteConfigFr from './site_config_fr.json';

const SiteConfig = (language = 'en') => {
	const siteConfigs = {
		siteConfigEn: siteConfigEn,
		siteConfigFr: siteConfigFr
	}
	return(siteConfigs['siteConfig' + language.charAt(0).toUpperCase() + language.slice(1)]);
}
export default SiteConfig;
