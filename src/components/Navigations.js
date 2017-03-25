import CodeModal from './codemirror_modal';
import {connect} from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';

import {showPreview, hidePreview } from '../reducers/preview';

const mapStateToProps = (state) => {
	return {
		boxes: state.get('boxes').toJS(),
		preview: state.get('preview').toJS().preview,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showPreview(boxes){
			dispatch(showPreview(boxes))
		},
		hidePreview(){
			dispatch(hidePreview())
		},
	}
}


class Navigation extends Component{
	constructor(props){
		super(props);
		this.showHide=this.showHide.bind(this);
	};

	showHide = (e) => {
		e.preventDefault();
		let previewCur = this.props.preview;
		console.log(previewCur);
		if (previewCur===true){
			console.log('true, need to set to false');
			this.props.hidePreview();
		} else {
			this.props.showPreview(this.props.boxes);
		}
	}

	render(){
		//conditional rendering... will likely pull from routes
		const user = false;

		let page=this.props.page;

		const templates = page !== 'templates';
		const directions = page !== 'directions';
		const editor = page !== 'editor';

	return(
	        <div className="row col-lg-12 flexWrap p20w bkgrey">
	        	<div className="col-lg-6">
	    			<Link to="/"><span className="TrendHMTitle"><img src="/AAlogo.svg" /> Agile-Armature </span></Link>
	    			{templates &&
						<Link to="/templates"><span className="menuL" > Templates <span className="glyphicon glyphicon-minus"></span></span></Link>

	    			}
	    			{directions &&
	    			<Link to="/directions"><span className="menuL" > Directions <span className="glyphicon glyphicon-minus"></span></span></Link>
	    			}
	    			{user &&
	    				<Link to="/profile"><span className="menuL" > User Page </span></Link>
	    			}
	    			<span className="menuL" > Login </span>
	    		</div>
	    		<div className="col-lg-6 flexWrap spaceBetween">

						<CodeModal />
							<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button" onClick={this.showHide}> Preview Hierarchy   </button>
							<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button"> Live Preview   </button>
							<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button"> Download Code   </button>
							<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button"> Save Layout   </button>


				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
