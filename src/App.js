import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import Box from './components/Box';
import Grid from './components/Grid';
import { setBox, loadParentBox, addBox } from './reducers/boxes'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		boxes: state.boxes
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBox(box){
			dispatch(setBox(box))
		},
		loadParentBox(){
			dispatch(loadParentBox())
		},
		addBox(){
			dispatch(addBox())
		}
	}
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
		boxCount: 1,
	}
  }

  componentWillMount(){
	  this.props.loadParentBox();
  }

	render= (() => {
		const box = this.props;
		console.log('this box ', box);

		return (
			<div className="App col-lg-12">
				<div>
					<div id="frame" className="col-lg-8">
						{
							<Box x={box.x} y={box.y} height={box.height} width={box.width} setBox={this.props.setBox} />
						}
					</div>
					<div id="sidebar" className="col-lg-4">
						<button
						className={"btn btn-primary btn-lg"}
						>Add New Box</button>
					</div>
				</div>
			</div>
	    )
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// <Box setBox={this.props.setBox} box={this.props.box} />

