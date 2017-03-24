import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SplitPane from 'react-split-pane';
import Immutable from 'immutable';

import Grid from './components/Grid';
import TrashCan from './components/TrashCan';
import Window from './components/Window';
import AddOptions from './components/AddOptions';
import BottomOptions from './components/BottomOptions';
import Patterns from './components/Patterns';
import CodeModal from './components/codemirror_modal';
import Code from './components/Codemirror';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from './constants_actioncreators/boxes';

import './style/css/App.css';

const mapStateToProps = (state) => {
	const ids = Object.keys(state.get('boxes').toJS())
	return {
		boxes: state.get('boxes'),
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
		}
	}
}


class App extends Component {
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
						<button className="btn btn-default btn-sm" > Other </button>
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
								boxes={this.props.boxes.toJS()}
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
										x={boxes.get(box).get('x')}
										y = {boxes.get(box).get('y')}
										height={boxes.get(box).get('height')}
										width={boxes.get(box).get('width')}
										children={boxes.get(box).get('children').toJS()}
										parent={boxes.get(box).get('parent')}
										tag={boxes.get(box).get('tag')}
										css={boxes.get(box).get('css')}
										boxIds={boxIds}
										boxes={this.props.boxes.toJS()}
										boxCopier={this.boxCopier}
										/>
										)
									)
								}
								<AddOptions action={this.boxAdder} />
								<BottomOptions />
								<TrashCan removeBox={this.props.removeBox} />
							</svg>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
