//background functionality
import React, { Component } from 'react';
import {connect} from 'react-redux';

//core actions
import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from '../reducers/boxes';

//all svg drawing things
import Patterns from './Patterns';
import Window from './Window';
import Grid from './Grid';
import TrashCan from './TrashCan';
import BottomOptions from './BottomOptions';
import AddOptions from './AddOptions';
import FontColor from './FontColor';

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


class DrawHere extends Component {
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
		        <div>
						{/* need to map to get current tabs */}

					  <ul className="nav nav-tabs" role="tablist">
					    <li role="presentation" className="active bkoffwhite TrendHandMade"><a href="#group1" aria-controls="home" role="tab" data-toggle="tab">[Group1]</a></li>
					    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Add+</a></li>
					    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Add+</a></li>
					    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Add+</a></li>
					  </ul>

					  	{/* need to map to get current tabs...instead this will be a filter of the main section */}
					  <div className="tab-content ">
					    <div role="tabpanel borders" className="tab-pane active " id="group1">
					    	<div className="tabSpaceActive">
								<div className=" row bkoffwhite borders">
									<div id="grid-snap" className="svgHolder col-lg-10 bkoffwhite ">
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
				  	</div> {/* out of main tab-content */}

				</div>


		        )
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(DrawHere);
