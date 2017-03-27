//background functionality
import React, { Component } from 'react';
import {connect} from 'react-redux';

//core actions
import Immutable from 'immutable';

import Faketabs from './Faketabs';

//all svg drawing things
import {saveGroup,loadLayout} from '../constants_actioncreators/layout';
import {setCurrent,getLayouts, makeGroup} from '../constants_actioncreators/groups'
import CodeModal from './codemirror_modal';
import Code from './Codemirror';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from '../constants_actioncreators/boxes';

import '../style/css/App.css';

//all svg drawing things
import FamilyThumbnails from './FamilyThumbnails';
import FamilyScroll from './FamilyScroll';
import FontColor from './FontColor';

const mapStateToProps = (state) => {
	const ids = Object.keys(state.get('boxes').toJS());
	return {
		boxes: state.get('boxes').toJS(),
		boxesCss: state.get('sibling'),
		html: state.html,
		pages: state.get('pages').get('pages'),
		groups: state.get('pages').get('groups'), // layer names and conventions
	//	allgroups: state.layouts,
		boxIds: ids,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loadSelected(id,groupId){ //pass in group id too
			dispatch(loadLayout(id))// eventually id passed in
			dispatch(setCurrent(id))//
			//dispatch set pages or something,
		},
		loadLayouts(id){
			console.log('group id',id)
			dispatch(getLayouts(id))
			dispatch(makeGroup(id))
		}
		
		//clearly the load all templates and group calls go here
	}
}


class ViewGroups extends Component {
	constructor(props){
		super(props);
		this.state= {
			formText: '',
			currentLayoutIds: [],
			currentFamily: '',

		}


	}

	selectFamily = (e => {
		let id = e.target.attributes.value.value;
		console.log(id)
		//a dispatch that goes to the actions to get templates from database
		//this.props.showFamily(id);
	})

	searchFamily = (e => {
		e.preventDefault();

		//a dispatch that goes to the actions to get templates from database
		//this.props.showFamily(id);
	})

	render(){

		//presume we want local form events and click searches to
		// be stored on this combined state

		return (
		        <div>
		        	<div className="bkgrey"> {/* need dispatches to trickle up and change state from tabs*/}
		        	<Faketabs  state={this.state} actions="add later"/>

		        	</div>
			        <div className="offset15side">
						  <div className="" id="">
									<div className=" row bkoffwhite borders">
										<div id="grid-snap" className="svgHolder2 col-lg-9 bkoffwhite ">
											<FamilyThumbnails groups = {this.props.pages} clickHandle= {this.props.loadSelected} action="" />
										</div>
										<div className="viewFam col-lg-3 bkoffwhite">
											<FamilyScroll groups = {this.props.groups} action="" clickAdd={this.props.loadLayouts} />
										</div>

									</div> {/*out of main tabSpaceActive */}
					  	</div>

					</div>{/* out of main tab-content */}
				</div>



		        )
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroups);
