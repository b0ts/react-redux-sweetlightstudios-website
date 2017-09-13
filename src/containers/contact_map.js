import React, { Component } from 'react';

class ContactMap extends Component {
  componentDidMount() {
    // You need the google maps api script in the index.html prior to the react entry
    const studio = {lat: 37.642516, lng: -122.414485};
    var contactmap = new google.maps.Map(this.refs.contactMap, { // eslint-disable-line no-undef
       zoom: 14, 
       center: studio
    });
    new google.maps.Marker({  // eslint-disable-line no-undef
       position: studio,
       map: contactmap
     });
  }
  render() {
    return (
      <div className="contact-map-container"> 
        <div className="contact-map" ref= "contactMap" /> 
      </div>
    );
  }
}
export default ContactMap;
