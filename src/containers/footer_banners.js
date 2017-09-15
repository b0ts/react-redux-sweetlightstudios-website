import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { SocialIcon } from 'react-social-icons';
import { Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NotificationBanner from '../components/notification_banner';

class FooterBanners extends Component {
	render() {
		return (
			<footer className="FooterBanners">
	  		<Well bsSize="small">
	  			<span className="FooterBannerText">{ this.props.siteConfig.footer.socialText }</span>
	  			{this.renderSocialIcons()}
					<a href={this.props.siteConfig.footer.emailURL}>
						<img 
							className = "mail-envelope" 
							src={this.props.siteConfig.imageCDN + this.props.siteConfig.footer.emailImage} 
							alt={this.props.siteConfig.footer.emailAlt} />
					</a>
					<span className="FooterBannerText"> &nbsp;&nbsp;{ this.props.siteConfig.footer.languageText } </span>
				 	<LinkContainer className="language-flag" to={ "/home/fr/" }>
						<img 
							src={this.props.siteConfig.imageCDN + this.props.siteConfig.footer.frenchImage} 
							alt={this.props.siteConfig.footer.frenchAlt}
							/>
					</LinkContainer>
					
					<LinkContainer className="language-flag" to={ "/home/en/" }>
						<img 
							src={this.props.siteConfig.imageCDN + this.props.siteConfig.footer.englishImage} 
							alt={this.props.siteConfig.footer.englishAlt}
							/>
					</LinkContainer>
					
	  		</Well>
	  			<NotificationBanner 
	  				bannerText = {this.props.siteConfig.footer.notificationText} 
	  				bannerLink = {this.props.siteConfig.footer.notificationLink}
	  			/>
	  	</footer>
		);
	}
	renderSocialIcons() {
		return this.props.siteConfig.footer.socialLinks.map((socialLink) => {
			return (
				<SocialIcon
					key = {socialLink.socialKey} 
					url = {socialLink.url} 
					color="black" 
				/>
			);
		});
	}
}

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig  });
export default connect(mapStateToProps) (FooterBanners);
