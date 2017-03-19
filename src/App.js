import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import Grid from './components/Grid';
import TrashCan from './components/TrashCan';
import AddOptions from './components/AddOptions';
import TextGrid from './components/TextComponents'; //testing conditonal rendering for tag types
import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild } from './reducers/boxes';

import {connect} from 'react-redux';
import CodeModal from './codemirror_modal';
import {codetest} from './Codemirror';
import SplitPane from 'react-split-pane';
import Code from './Codemirror';
import './App.css';

const mapStateToProps = (state) => {
	const ids = Object.keys(state.boxes);
	return {
		boxes: state.boxes,
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
		}
	}
}


class App extends Component {
	constructor(props){
		super(props);
		this.boxAdder = this.boxAdder.bind(this);
	}

	boxAdder(e){

		let tagType = e.target.attributes.value.value;
		const id = +this.props.nextBoxId;

		this.props.addBox(id, tagType);
	}

	render(){
		const boxes = this.props.boxes;
		const boxIds = this.props.boxIds;

		return (

			<div className="App">
				<SplitPane split="vertical" defaultSize={200} primary="first">
					<div>
					<Code htmlString={'//HTML\n\n'+this.props.html.html}/>
          <Code htmlString={this.props.html.css} />
					</div>
						<div className="App">
							<div>
								<div id="grid-snap" className="col-lg-12">
									<svg id="drawHere" width="1100px" height="650px">
										{
											boxIds.map(box => (
												<Grid key={box}
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
															/>
													))
												}
												<AddOptions action={this.boxAdder} />
												<TrashCan removeBox={this.props.removeBox} />
											</svg>
										</div>
									</div>
								<div className="button-box">
									<CodeModal />
									<button
										className={"btn btn-primary btn-lg"}
										onClick={this.boxAdder}
										>Add New Box</button>
								</div>
						</div>
				</SplitPane>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
