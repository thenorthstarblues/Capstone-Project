//background functionality
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import Faketabs from './Faketabs';

//all svg drawing things
import Patterns from './Patterns';
import Window from './Window';
import Grid from './Grid';
import TrashCan from './TrashCan';
import BottomOptions from './BottomOptions';
import AddOptions from './AddOptions';
import FontColor from './FontColor';
import {saveGroup} from '../constants_actioncreators/layout';
import CodeModal from './codemirror_modal';
import Code from './Codemirror';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from '../constants_actioncreators/boxes';

import '../style/css/App.css';

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


class DrawHere extends Component {
	constructor(props){
		super(props);
		this.state= {
			activeLayoutId:'', //to pull up main pg contents / should be selected tab
			groupIds:[], //all groupIds

		}
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
		        <div> {/* need dispatches to trickle up and change state from tabs*/}
		        	<Faketabs state={this.state} actions="add later"/>


					  <div className="offset15side">
						  <div className="tab-content tab-pane active " id="link to tabs">
								<div className=" row bkoffwhite borders">
									<div id="grid-snap" className="svgHolder col-lg-10 bkoffwhite ">

									{/* update svg id to redraw interior by id? group logic of interactions */}
										<svg id="drawHere" width="1175px" height="555px" className="text-left">
											<Patterns />
												<rect x="0" y="0" width="950px" height="500px" fill="white" />
												<Window setParent={this.props.setParent} addChild={this.props.addChild}
													removeParent={this.props.removeParent} removeChild={this.props.removeChild}
													boxes={this.props.boxes}
													/>
												{ boxIds.slice(1).map(box => (
														<Grid
															key={box}
															setBox={this.props.setBox}
															removeBox={this.props.removeBox}
															setParent={this.props.setParent}
															addChild={this.props.addChild}
															removeParent={this.props.removeParent}
															removeChild={this.props.removeChild}
															id={+box}
															x={boxes[box].x}
															y = {boxes[box].y}
															height={boxes[box].height}
															width={boxes[box].width}
															children={boxes[box].children}
															parent={boxes[box].parent}
															tag={boxes[box].tag}
															css={boxes[box].css}
															boxIds={this.props.boxIds}
															boxes={this.props.boxes}
															boxCopier={this.boxCopier}
															/>
															)
														)
													}
												<TrashCan removeBox={this.props.removeBox} />
												<BottomOptions />
											</svg>
										</div>
										<div className="addOptions col-lg-2 bkoffwhite">
											<AddOptions action={this.boxAdder} />
										</div>
								</div>
								<FontColor />
							</div> {/*out of main tabSpaceActive */}
				    	</div>
				  	</div>

		        )
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(DrawHere);
