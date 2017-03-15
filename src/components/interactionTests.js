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
  }

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
