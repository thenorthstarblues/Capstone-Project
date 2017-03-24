import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigations';
import DrawHere from './components/DrawHere';

import Patterns from './components/Patterns';
import Window from './components/Window';
import Grid from './components/Grid';
import TrashCan from './components/TrashCan';
import BottomOptions from './components/BottomOptions';
import AddOptions from './components/AddOptions';
import FontColor from './components/FontColor';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from './reducers/boxes';
//import { findSibling } from './reducers/siblngReducer2';


import {connect} from 'react-redux';
import './style/css/App.css'

const mapStateToProps = (state) => {
	const ids = Object.keys(state.boxes);
	return {
		boxes: state.boxes,
		boxesCss: state.sibling,
		html: state.html,
		boxIds: ids,
		nextBoxId: Number(ids[ids.length - 1]) + 1,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBox(box){
			dispatch(setBox(box))
		},
		addBox(boxId,tag){
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
		}
	}
}


class App extends Component {
	constructor(props){
		super(props);
		this.state= {}
		this.boxAdder=this.boxAdder.bind(this);

	}

	boxAdder = (e => {
		let tagType = e.target.attributes.value.value;
		const id = +this.props.nextBoxId;
		this.props.addBox(id, tagType);
	})

	boxCopier = (boxToCopy) => {
		const newBoxId = +this.props.nextBoxId;
		this.props.copyBox(boxToCopy, newBoxId);
	}

	render(){
		const boxes = this.props.boxes;
		const boxIds = this.props.boxIds;

		return (
			<div className="App bkgrey">
				<div className="container-fluid ">
					<Navigation />
					<DrawHere />
					{/*<Footer />*/}
			</div>
		</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
