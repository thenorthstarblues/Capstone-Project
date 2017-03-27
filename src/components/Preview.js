//background functionality
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import Navigation from './Navigations';

import '../style/css/App.css';
import '../style/css/preview.css';




const mapStateToProps = (state) => {
	const ids = Object.keys(state.get('boxes').toJS());
	const idsCss = Object.keys(state.get('boxesCss').toJS());

	return {
		boxes: state.get('boxes').toJS(),
		boxesCss: state.get('boxesCss').toJS(),
		html: state.get('html').toJS(),
		preview: state.get('preview').toJS().preview,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}


class User extends Component {
	constructor(props){
		super(props);
		this.state= {}
	}


	render(){

		//var output = converter.convert(this.props.html.htmlPreview);

		return (
		    <div>
				<style>
				{this.props.html.css}
				</style>
				<div className="App bkgrey">
					<div className="container-fluid ">
						<Navigation page="preview" />

					</div>
				</div>
				<div className="ratioContainer">
				<div className="ratioContainer" dangerouslySetInnerHTML={{ __html: this.props.html.htmlPreview }} />
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, null)(User);
