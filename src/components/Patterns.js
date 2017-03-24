import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

const Patterns = (()=> {

	//we should be able to dynamically update fonts, as added from google...
	//simply to appear with our dummy text


	var repeats=[];
	for (let i=0; i<600/14; i++){
		repeats.push(i);
	}

    return (
            <defs>
            	<pattern id="pixelGrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
			      <rect x="0" y="0" width="14" height="14" fill="none" stroke="lightblue" />
			    </pattern>


			    <pattern id="paragraph" x="0" y="0" width="12" height="12" >
			    	{repeats.map(ind=>{
			    		return (
						    	<g>
						      		<rect x="0" y={ind*12} width="1000" height="7" fill="#d0d0d0" />
						      		<rect x="0" y={ind*12+7} width="12" height="5" fill="white" />
						      	</g>

			    		        )
			    		})
			    	}
			    </pattern>


			    <pattern id="h1" x="0" y="0" width="1" height="1" >
			      <rect x="0" y="7" width="950" height="24" fill="grey"/>
			      <text x="2" y="28" fontSize="22" textAnchor="start" fill="white" className="">H1 Header</text>
			    </pattern>
			    <pattern id="h2" x="0" y="0" width="1" height="1" >
			      <rect x="0" y="7" width="950" height="21" fill="grey"/>
			      <text x="2" y="26" fontSize="18" textAnchor="start" fill="white" className="">H2 Header</text>
			    </pattern>
			    <pattern id="h3" x="0" y="0" width="1" height="1" >
			      <rect x="0" y="7" width="950" height="18" fill="grey"/>
			      <text x="2" y="23" fontSize="16" textAnchor="start" fill="white" className="">H3 Header</text>
			    </pattern>
			    <pattern id="h4" x="0" y="0" width="1" height="1" >
			      <rect x="0" y="7" width="950" height="16" fill="grey"/>
			      <text x="2" y="21" fontSize="14" textAnchor="start" fill="white" className="">H4 Header</text>
			    </pattern>
			    <pattern id="h5" x="0" y="0" width="1" height="1" >
			      <rect x="0" y="7" width="950" height="14" fill="grey"/>
			      <text x="2" y="19" fontSize="12" textAnchor="start" fill="white" className="">H5 Header</text>
			    </pattern>

			    <pattern id="img" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox">
			      <rect x="0" y="0" width="1" height="1" fill="#333333"/>
			      <line x1="0" x2="1" y1="0" y2="1" stroke="#ffffff" />
			    </pattern>


			    <pattern id="ului" x="0" y="0" width="10" height="14" >
			    	{repeats.map(ind=>{
			    		return (
						    	<g>
						      		<rect x="20" y={ind*14} width="1000" height="7" fill="lightgrey" />
						      		<circle cx="10" cy={ind*14+4} r="3" fill="grey" />
						      	</g>

			    		        )
			    		})
			    	}
			    </pattern>

  			</defs>

    )

})

export default Patterns;
