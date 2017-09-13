import React, { Component } from 'react';
import { connect } from 'react-redux'; // glue between react and redux

class JsonGet extends Component {
	render() {
		return (
			<div>
				<h2> { (this.props.jsonTest ) ? this.props.jsonTest.title : ""} </h2>
				<p> { (this.props.jsonTest) ? this.props.jsonTest.content : ""} </p>
		  </div>
		);
	}
}
function mapStateToProps(state) {
	return {
		jsonTest: state.jsonTest, // what to hook up from reducers/index.js
	};
}
export default connect(mapStateToProps) (JsonGet);
