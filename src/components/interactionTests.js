import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import Box from './Box';

class InteractionTest extends Component {
  constructor(props) {
    super(props);
    this.state={
    	dummystyle: {
    		backgroundColor: "none",
    	 	border: "solid",
    	 	display: "inline-block",
    	 	borderRadius: 5,
    	 	width: 400,
    	 	height: 400,
    	 },
    }
    this.setStyle=this.setStyle.bind(this);
  }

	setStyle = ((obj) => {

		return {
			backgroundColor: "none",
			border: "solid",
			display: "inline-block",
			borderRadius: 5,
			width: 50,
			height: 50,
			transform: `translate(${this.state[obj].x}px, ${this.state[obj].y}px)`,
		};
	});

	render= (() => {

		return (
		  <div id="frame">
		  	<p>really?</p>
	      	<div id="obj2" style={this.state.dummystyle} />
	      	<Box />
	      </div>
	    )
	});
}

export default InteractionTest;
