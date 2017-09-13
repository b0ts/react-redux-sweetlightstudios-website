import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux
import { FormGroup, ControlLabel, FormControl, Radio, Button } from 'react-bootstrap';
import FieldGroup from '../components/field_group';

class ContactForm extends Component {
	render() {
		const form = this.props.siteConfig.contactForm; // DRY
		return (
			<form action="https://formspree.io/rhbourbonnais@yahoo.com" method="POST">
			<input type="hidden" name="_next" value="/thank-you/" />
		    <FieldGroup
		    	name="_replyto"
		      id="formControlsEmail"
		      type="email"
		      label={form.emailTitle}
		      placeholder={form.emailText}
		    />
		    <FieldGroup
		    	name="name"
		      id="formControlsText"
		      type="text"
		      label={form.nameTitle}
		      placeholder={form.nameText}
		    />
		    <FormGroup>
		    	<ControlLabel name="type">{form.typeTitle}</ControlLabel>
		    	{<br />}
		      <Radio name="radioGroup" value="Loved Ones" inline>
		        {form.typeRadio[0]}
		      </Radio>
		    	{<br />}
		      <Radio name="radioGroup" value="Personal Branding" inline>
		        {form.typeRadio[1]}
		      </Radio>
		    	{<br />}
		      <Radio name="radioGroup" value="Makeover" inline>
		        {form.typeRadio[2]}
		      </Radio>
		      {<br />}
		       <Radio name="radioGroup" value="Commercial" inline>
		        {form.typeRadio[3]}
		      </Radio>
		    </FormGroup>

		    <FieldGroup
		    	name="phone"
		      id="formControlsPhone"
		      type="text"
		      label={form.phoneTitle}
		      placeholder={form.phoneText}
		    />

		    <FormGroup name="info" controlId="formControlsTextarea">
		      <ControlLabel name="infoLabel" >{form.additionalTitle}</ControlLabel>
		      <FormControl name="additionalInfo" componentClass="textarea" placeholder={form.additionalText} />
		    </FormGroup>

		    <Button className="contact-button" bsStyle="primary" type="submit" value="send">
		      {form.submitButtonText}
		    </Button>
		  </form>
		);
	}
}
const mapStateToProps = (state) => ({ siteConfig: state.siteConfig });
export default connect(mapStateToProps) (ContactForm);
