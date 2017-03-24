import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigations';
import DrawHere from './components/DrawHere';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {saveGroup} from './constants_actioncreators/layout';
import './style/css/App.css';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from './constants_actioncreators/boxes';


const mapStateToProps = (state) => {
	const ids = Object.keys(state.get('boxes').toJS());
	return {
		boxes: state.get('boxes').toJS(),
		boxesCss: state.get('sibling'),
		html: state.get('html'),
		boxIds: ids,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		setBox(box){
			dispatch(setBox(box))
		},
		addBox(boxId, tag){
			dispatch(addBox(boxId, tag))
		},
		removeBox(boxId){
			dispatch(removeBox(boxId))
		},
		setParent(parentId, childId){
			dispatch(setParent(parentId, childId))
		},
		addChild(parentId, childId){
			dispatch(addChild(parentId, childId))
		},
		removeParent(childId){
			dispatch(removeParent(childId))
		},
		removeChild(parentId, childId){
			dispatch(removeChild(parentId, childId))
		},
		copyBox(boxId, newBox){
			dispatch(copyBox(boxId, newBox))
		},
		addGroup(name,currentId){
			dispatch(saveGroup(name,currentId))
		}
	}
}


class App extends Component {
	constructor(props){
		super(props);
		this.state= {}
		this.boxAdder=this.boxAdder.bind(this);

	}

	boxAdder = (e) => {
		let tagType = e.target.attributes.value.value;
		const lastId = this.props.boxIds[this.props.boxIds.length - 1];
		const newId = +lastId + 1;
		this.props.addBox(newId, tagType);
	}

	boxCopier = (boxToCopy) => {
		const lastId = this.props.boxIds[this.props.boxIds.length - 1];
		const newId = +lastId + 1;
		this.props.copyBox(boxToCopy, newId);
	}

	render(){
		const boxes = this.props.boxes;
		const boxIds = this.props.boxIds.map(Number);

		return (
			<div className="App bkgrey">
				<div className="container-fluid ">
					<Navigation page="editor"/>
					<DrawHere />
					{/*<Footer />*/}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
