import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import * as DnD from 'react-drag-and-drop';
import interact from 'interact.js';

// are we redux-ing???
//import {connect} from 'react-redux';
//import { browserHistory, Link } from 'react-router';

// and we can add other dumb components here. . .

class InteractionTest extends Component {
  constructor(props) {
    super(props);
    this.state={
    	obj1: { x:20, y:20, wide:200, high:200 },
    	obj2: { x:40, y:40, wide:40, high:40 },
    	obj3: {	x:40, y:40, wide:80, high:80 },
    }

    //bind the major functions here
    //this.objAdd=this.objAdd.bind(this);
    this.setStyle=this.setStyle.bind(this);
    this.onMove=this.onMove.bind(this);


  } //constructor done.

 //    //interact lives in Component did mount or within the redux mapState/Dispatch arena
 //    componentDidMount = (()=> {

	componentDidMount(){
	    interact('.testClass')
	      .draggable({
	        onmove: this.onMove
	    	})
	   //    .resizable({
		  //   preserveAspectRatio: false,
		  //   edges: { left: true, right: true, bottom: true, top: true }
		  // })
	};

	setStyle = ((obj) => {
		console.log(this.state[obj].x);

		return {
			backgroundColor: "none",
			border: "solid",
			display: "inline-block",
			borderRadius: 5,
			// width: 50,
			// height: 50,
			width: `{${this.state[obj].wide}}`,
			height: `{${this.state[obj].high}}`,
			transform: `translate(${this.state[obj].x}px, ${this.state[obj].y}px)`,
		};
	});

	onMove = ((e) => {
		let stateObj = e.target.id;
		this.setState({ [stateObj]: {
				x: this.state[stateObj].x + e.dx,
				y: this.state[stateObj].y + e.dy,
				wide: this.state[stateObj].wide,
				high: this.state[stateObj].high,
			}
		});
		console.log(e, this.state[e.target.id].x);
	});

	// addSquare = ((e)=>{

	// })

	render= (() => {

		console.log(this.state);

		return (
		  <div id="frame">
		  	<p>really?</p>
	      	<div className='testClass' id="obj1" style={this.setStyle('obj1')} />
	      	<div className='testClass' id="obj2" style={this.setStyle('obj2')} />
	      	<div className='testClass' id="obj3" style={this.setStyle('obj3')} />
	      </div>
	    )
	});
}

export default InteractionTest;
