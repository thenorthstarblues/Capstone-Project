//I'm setting this up so we can simply use conditional rendering IN THE GRID COMPONENT
//this is just a mirror... once David is done w/ grid updates, we can incorporate these svg/group options.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


export const Paragraph = ((props)=> {
  //console.log(props);
  let lines;

    return (
              <g> {/* multiple grey boxes on white box w/ thin outline */}
              	{lines.map((line, i) =>{
              		return <rect />
              	})}
                <rect />
              </g>
    )

})

export const Ul = ((props)=> {
  //console.log(props);
  let lines;

    return (
              <g> {/* multiple grey boxes on white box w/ thin outline */}
              	{lines.map((line, i) =>{
              		return <rect />
              	})}
                <rect />
              </g>
    )

})





