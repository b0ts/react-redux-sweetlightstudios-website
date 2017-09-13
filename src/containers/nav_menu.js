import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

class NavMenu extends Component {
	render() {
		return  (
			<nav className="NavBar">
				<Navbar default collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				      	<LinkContainer className="menu-thumbnail" to= { this.props.siteConfig.menuElements.brand.link }>
				      		<img src= {this.props.siteConfig.imageCDN + this.props.siteConfig.menuElements.brand.imageSource } 
				      		alt= { this.props.siteConfig.menuElements.brand.altText }/>
	  						</LinkContainer>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				      	{this.renderNavMenu()}
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			</nav>
		);
	};
	renderNavMenu() {
		return this.props.siteConfig.menuElements.items.map((item) => {
			return (item.type === "submenu") 
				? (this.renderNavSubMenu(item))
				: (
					<LinkContainer key={ item.eventKey } to={ item.link }>
			   		<NavItem eventKey={ item.eventKey }>{ item.title }</NavItem>
					</LinkContainer>
				);
		});
	};
	renderNavSubMenu(item) {
		return (
		  <NavDropdown key = { item.eventKey } eventKey={ item.key } title={ item.title } id = {item.submenu} >
 				{ this.renderSubMenuItems(item.submenu) }
    	</NavDropdown>
		);
	};
	renderSubMenuItems(submenuName) {
		return this.props.siteConfig.menuElements[submenuName].map((item) => {
			return (
				<LinkContainer key = { item.eventKey } to={ item.link }>
	  			<MenuItem  
	   				onSelect={(e) => { document.getElementById(submenuName).click(); }}   
	   				eventKey={ item.eventKey }>{ item.title }</MenuItem>
				</LinkContainer>
			);
		})
	};
};

const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
export default connect(mapStateToProps, null, null, {
  pure: false
}) (NavMenu);
