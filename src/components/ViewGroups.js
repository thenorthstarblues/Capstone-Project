import React, { Component } from 'react';

import Faketabs from './Faketabs';
import FamilyThumbnails from './FamilyThumbnails';
import FamilyScroll from './FamilyScroll';
import FontColor from './FontColor';

import '../style/css/App.css';

class ViewGroups extends Component {
	constructor(props){
		super(props);
		this.state= {
			formText: '',
			currentLayoutIds: [],
			currentFamily: '',
		}
	}

	selectFamily = e => {
		let id = e.target.attributes.value.value;
	}

	searchFamily = e => {
		e.preventDefault();
	}

	render(){
		return (
			<div>
				<div className="bkgrey">
					<Faketabs
						state={this.state}
						actions="add later"/>
				</div>
				<div className="offset15side">
					<div className="" id="">
						<div className=" row bkoffwhite borders">
							<div
								id="grid-snap"
								className="svgHolder2 col-lg-9 bkoffwhite ">
									<FamilyThumbnails
										groups={this.props.pages}
										loadSelected={this.props.loadSelected} />
							</div>
							<div className="viewFam col-lg-3 bkoffwhite">
								<FamilyScroll
									groups={this.props.groups}
									loadLayouts={this.props.loadLayouts} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ViewGroups;
