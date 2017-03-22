import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

const ButtonReg = ({action, x, y, value, style, format})=> {

  return (
        <g>
          <rect x={x} y={y} width="70" height="30" value={value} data={style} className="adds" onClick={action} />
          <text x={x+8} y={y+22} textAnchor="start" className="icons " >{format}</text>
          <text x={x+32} y={y+20} textAnchor="start" className="small" >{value}</text>
        </g>
        )
}

const ButtonH = ({action, x, y, value, style, format})=> {

  return (
          <g>
            <rect x={x} y={y} width="45" height="30" className="adds " onClick={action} value={value} data={style} />
            <text x={x+8} y={y+22} textAnchor="start" className="iconsH " >{format}</text>
            <text x={x+25} y={y+20} textAnchor="start" className="small" >{value}</text>
          </g>
        );
}

const ButtonSm = ({action, x, y, value, style, format})=> {

  return (
          <g>
            <rect x={x} y={y} width="45" height="30" className="adds " onClick={action} value={value} data={style} />
            <text x={x+8} y={y+22} textAnchor="start" className="icons " >{format}</text>
            <text x={x+28} y={y+20} textAnchor="start" className="small" >{value}</text>
          </g>
        );
}


const BottomOptions = (()=> {
  //question of options

  //screen break bar - click to show target width when composing

  //show/hide 20px grid

  //show/hide


  let yVal = 70;
  let xVal = 1100;
  let xVal2 = 1180;

    return (
              <g> {/* this is just the dummy layout, buttons up here */}


              </g>
    )

})

export default BottomOptions;
