import React, { Component } from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import Navigation from './components/Navigations';
import DrawHere from './components/DrawHere';


// alternate actions for the dispatch structure
//import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from './reducers/boxes';



import {connect} from 'react-redux';
=======
import {connect} from 'react-redux';
import SplitPane from 'react-split-pane';
import Immutable from 'immutable';

import Grid from './components/Grid';
import TrashCan from './components/TrashCan';
import Window from './components/Window';
import AddOptions from './components/AddOptions';
import BottomOptions from './components/BottomOptions';
import Patterns from './components/Patterns';
import bottomButtons from './components/pagesButton';
import {saveGroup} from './constants_actioncreators/layout';
import CodeModal from './components/codemirror_modal';
import Code from './components/Codemirror';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from './constants_actioncreators/boxes';

>>>>>>> de1b512020657b966c360119118738229497bdd5
import './style/css/App.css';

const mapStateToProps = (state) => {
	const ids = Object.keys(state.get('boxes').toJS());
	return {
<<<<<<< HEAD
		boxes: state.boxes,
		boxesCss: state.sibling,
		html: state.html,
		group: state.group,
=======
		boxes: state.get('boxes').toJS(),
		boxesCss: state.get('sibling'),
		html: state.get('html'),
>>>>>>> de1b512020657b966c360119118738229497bdd5
		boxIds: ids,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
<<<<<<< HEAD
=======
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
>>>>>>> de1b512020657b966c360119118738229497bdd5
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
<<<<<<< HEAD
		const id = +this.props.nextBoxId;
		this.props.addBox(id, tagType);
	})

	boxCopier = (boxToCopy) => { // here or on drawHere
		const newBoxId = +this.props.nextBoxId;
		this.props.copyBox(boxToCopy, newBoxId);
=======
		const lastId = this.props.boxIds[this.props.boxIds.length - 1];
		const newId = +lastId + 1;
		this.props.addBox(newId, tagType);
	}

	boxCopier = (boxToCopy) => {
		const lastId = this.props.boxIds[this.props.boxIds.length - 1];
		const newId = +lastId + 1;
		this.props.copyBox(boxToCopy, newId);
>>>>>>> de1b512020657b966c360119118738229497bdd5
	}

	render(){
		const boxes = this.props.boxes;
		const boxIds = this.props.boxIds.map(Number);

		return (
<<<<<<< HEAD
			<div className="App bkgrey">
				<div className="container-fluid ">
					<Navigation page="editor"/>
					<DrawHere />
					{/*<Footer />*/}
=======
			<div className="App">
				<div className="App">
					<div className="button-box">
						<button className="btn btn-default btn-sm" > Logo/Home Here </button>
						<CodeModal />
						<button className="btn btn-default btn-sm" > Live Preview </button>
						<button className="btn btn-default btn-sm" > Starting Templates </button>
						<button className="btn btn-default btn-sm" > Login/Logout </button>
						<button className="btn btn-default btn-sm" > User Profile/Designs </button>
						<button className="btn btn-default btn-sm" > Save/Share </button>
						<button className="btn btn-default btn-sm" onClick={ ()=> this.props.addGroup('testName', 1)}> Other </button>
						<bottomButtons />
					</div>
				<div>
					<div id="grid-snap" className="col-lg-12">
						<svg id="drawHere" width="1350px" height="600px">
							<Patterns />
							<Window
								setParent={this.props.setParent}
								addChild={this.props.addChild}
								removeParent={this.props.removeParent}
								removeChild={this.props.removeChild}
								boxes={this.props.boxes}
								/>
							{
								boxIds.slice(1).map(box => (
									<Grid
										key={box}
										setBox={this.props.setBox}
										removeBox={this.props.removeBox}
										setParent={this.props.setParent}
										addChild={this.props.addChild}
										removeParent={this.props.removeParent}
										removeChild={this.props.removeChild}
										id={box}
										x={boxes[box].x}
										y = {boxes[box].y}
										height={boxes[box].height}
										width={boxes[box].width}
										children={boxes[box].children}
										parent={boxes[box].parent}
										tag={boxes[box].tag}
										css={boxes[box].css}
										boxIds={boxIds}
										boxes={this.props.boxes}
										boxCopier={this.boxCopier}
										/>
										)
									)
								}
								<AddOptions action={this.boxAdder} />
								<BottomOptions />
								<TrashCan removeBox={this.props.removeBox} />
								<bottomButtons/>
							</svg>
						</div>
					</div>
				</div>
				<bottomButtons/>
>>>>>>> de1b512020657b966c360119118738229497bdd5
			</div>
		</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
