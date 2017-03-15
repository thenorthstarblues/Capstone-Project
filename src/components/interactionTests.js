import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import Box from './Box';
import Grid from './Grid';

class InteractionTest extends Component {
  constructor(props) {
    super(props);
    this.state={
    	dummystyle: {
    		backgroundColor: "none",
    	 	border: "solid 1px",
    	 	display: "inline-block",
    	 	width: 900,
    	 	height: 600,
    	 },
    }
  }

	render= (() => {

        var grids=[];
            var columns = Math.floor(this.state.dummystyle.width/12);
            var rowsNum = Math.floor(this.state.dummystyle.height/columns);
        for (var i=0; i<11; i++){ //change grid length to get more squares...
            grids.push(i);
        };





		return (
          <div>
    		  <div id="grid-snap" className="col-lg-8">
    	      	{/*<div id="" className="" style={this.state.dummystyle} />*/}
                <div id="" className="" />
                    {grids.map((grid,i)=>{
                        return <Grid id={'grid'+i} w={this.state.dummystyle.width/12-4} h={this.state.dummystyle.height/rowsNum-2}/>
                    })}
              </div>
              <div id="sidebar" className="col-lg-4">
              </div>
          </div>
	    )
	});
}

export default InteractionTest;
