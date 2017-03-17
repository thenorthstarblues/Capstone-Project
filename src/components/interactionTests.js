import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import interact from 'interact.js';
import Grid from './GridTesting.js';

class InteractionTest extends Component {
  constructor(props) {
    super(props);
  }


	render= (() => {

        var grids=[]; // just to quickly populate options
        for (var i=0; i<11; i++){
            grids.push(900/12*i);
        };

		return (
          <div>
    		  <div id="grid-snap" className="col-lg-8">
                <svg id="drawHere" width="900px" height="600px" onClick={this.add}>
                {grids.map((grid, i)=>{
                        return <Grid id={'grid'+i} w={60} h={40} x={grid} y={2} type='div' />
                    })
                }
                {grids.map((grid, i)=>{
                        return <Grid id={'gridh1'+i} w={60} h={20} x={grid} y={60} type='h1' />
                    })
                }
                {grids.map((grid, i)=>{
                        return <Grid id={'gridimg'+i} w={60} h={40} x={grid} y={100} type='img' />
                    })
                }
                </svg>
              </div>
              <div id="sidebar" className="col-lg-4">
              </div>
          </div>
	    )
	});
}

export default InteractionTest;
