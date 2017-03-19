import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


const AddOptions = (({action})=> {
  //console.log(action);

    return (
              <g> {/* this is just the dummy layout, buttons up here */}
                <text x="920" y="40" textAnchor="start">Click to Add Elements</text>
                <text x="920" y="60" textAnchor="start" className="small" >Div, Paragraph</text>
                  <rect x="920" y="70" width="70" height="30" value="div" className="adds" onClick={action}/>
                  <rect x="1000" y="70" width="70" height="30" value="p" className="adds" onClick={action}/>
                <text x="920" y="115" textAnchor="start" className="small" >Headers: h1, H2, 3, h4</text>
                  <rect x="920" y="120" width="70" height="15" value="h1" className="adds" onClick={action} />
                  <rect x="1000" y="120" width="70" height="15" value="h2" className="adds" onClick={action} />
                  <rect x="920" y="140" width="70" height="15" value="h3" className="adds" onClick={action} />
                  <rect x="1000" y="140" width="70" height="15" value="h4" className="adds" onClick={action} />
                <text x="920" y="165" textAnchor="start" className="small" >List, Table</text>
                  <rect x="920" y="170" width="70" height="30"  value="ul" className="adds" onClick={action} />
                  <rect x="1000" y="170" width="70" height="30" value="table" className="adds" onClick={action} />
                <text x="920" y="215" textAnchor="start" className="small" >Image, Svg</text>
                  <rect x="920" y="220" width="70" height="30" value="img" className="adds" onClick={action} />
                  <rect x="1000" y="220" width="70" height="30" value="svg" className="adds" onClick={action} />
                <text x="920" y="265" textAnchor="start" className="small" >Canvas, Video</text>
                  <rect x="920" y="270" width="70" height="30" value="canvas" className="adds" onClick={action} />
                  <rect x="1000" y="270" width="70" height="30" value="video" className="adds" onClick={action} />
                <text x="920" y="315" textAnchor="start" className="small" >Button, Alert</text>
                  <rect x="920" y="320" width="70" height="30" value="button" className="adds" onClick={action} />
                  <rect x="1000" y="320" width="70" height="30" value="alert" className="adds" onClick={action} />
                <text x="920" y="365" textAnchor="start" className="small" >Forms: Text, Options</text>
                  <rect x="920" y="370" width="70" height="30" value="input" className="adds" onClick={action} />
                  <rect x="1000" y="370" width="70" height="30" value="option" className="adds" onClick={action} />
                <text x="920" y="415" textAnchor="start" className="small" >Forms: Uploads, Radios</text>
                  <rect x="920" y="420" width="70" height="30" value="file" className="adds" onClick={action} />
                  <rect x="1000" y="420" width="70" height="30" value="radio" className="adds" onClick={action} />
                <text x="920" y="465" textAnchor="start" className="small" >Other Things</text>
                  <rect x="920" y="470" width="70" height="30" value="" className="adds" onClick={action} />
                  <rect x="1000" y="470" width="70" height="30" value="" className="adds" onClick={action} />
              </g>
    )

})

export default AddOptions;
