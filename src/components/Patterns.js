import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

//---------------------------VISUAL AIDES-------------------------------

// key sizes converted for svg
var px20=14;
var em1=10.6;
var wMax=950; //max width
var mSm=em1/2;
var mLg=em1;

// to generate multi-line patterns
var repeats=[];
for (let i=0; i<600/14; i++){
	repeats.push(i);
}

//---------------------------CORE TYPES-------------------------------

//repeated patterns

// those with logic of bounding box
const patternBoundingBox={
	img: {
		fill: '#636363',
		stroke: "#ffffff",
		repeat: 1,
	},
	video: {
		fill: '#636363',
		stroke: "#ffffff",
		repeat: 1,
		icon: <span className="glyphicon glyphicon-play-circle"></span>,
	},

}

// those with logic of default noMapping - i.e. set sizes
// headers - easy
// button - unique
// audio bar - unique
// radio buttons -
// options, file, form lines - variants
const defaultNoRepeat=[
	{
		id: 'h1',
		fill: 'grey',
		tfill: 'white',
		stroke: 'none',
		repeat: 1,
		barH: 24, //text height=-2, text offset=+5
		offset: 7,
		interior: ['rect', 'text'],
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'h2',
		fill: 'grey',
		tfill: 'white',
		stroke: 'none',
		repeat: 1,
		barH: 21, //text height=-2, text offset=+5
		offset: 7,
		interior: ['rect', 'text'],
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'h3',
		fill: 'grey',
		tfill: 'white',
		stroke: 'none',
		repeat: 1,
		barH: 18,
		offset: 7,
		interior: ['rect', 'text'],
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'h4',
		fill: 'grey',
		tfill: 'white',
		stroke: 'none',
		repeat: 1,
		barH: 14,
		offset: 7,
		interior: ['rect', 'text'],
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'h5',
		fill: 'grey',
		tfill: 'white',
		stroke: 'none',
		repeat: 1,
		barH: 12,
		offset: 7,
		interior: ['rect', 'text'],
		fontFam: 'Trenda', // to be reset by other options
	},

];

// those with logic of default noMapping and line repeats
// paragraphs, ul, tables,
const defaultRepeat=[ //new real effeciency gain
	{
		id:'paragraph',
		repeat: em1,
		y: em1*1.33,
		height: em1*.7,
		fill: "#d0d0d0"
	},
	{
		id:'ului',
		repeat: em1,
		y: em1*1.33,
		x: em1*2,
		xc: em1,
		r: 3,
		height: em1*.7,
		fill: "#d0d0d0",
		fillc: "grey",
	},
	{
		id:'table',
		repeat: em1,
		y: em1*1.33,
		x: em1*2,
		xc: em1,
		r: 3,
		height: em1*.7,
		fill: "#d0d0d0",
		fillc: "grey",
	},

];



const Patterns = (()=> {

    return (
            <defs>
            	<pattern id="pixelGrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
			      <rect x="0" y="0" width="14" height="14" fill="none" stroke="#00bfff" />
			    </pattern>

			    {defaultRepeat.map(pat => {
			    	if (pat.id.includes('paragraph')){ //all headers
				    	return (<pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
						    	{repeats.map(ind=>{
						    		return (<g key={ind} >
						    		        <rect x="0" y={ind * pat.y} width={wMax} height={pat.height} fill={pat.fill} />
									      	</g>
						    		        )
						    		})}
						    </pattern>)
			    	} else if (pat.id.includes('ului')){
			    	return (<pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
						    	{repeats.map(ind=>{
						    		return (<g key={ind} >
						    		        <rect x={pat.x} y={ind * pat.y} width={wMax} height={pat.height} fill={pat.fill} />
						    		        <circle cx={pat.xc}  cy={ind * pat.y+pat.height/2} r={pat.r} fill={pat.fillc} />
									      	</g>
						    		        )
						    		})}
						    </pattern>)
			    	} else if (pat.id.includes('table')){
			    	return (<pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
						    	{repeats.map(ind=>{
						    		return (<g key={ind} >
						    		        <rect x={pat.x} y={ind * pat.y} width={wMax} height={pat.height} fill={pat.fill} />
						    		        <circle cx={pat.xc}  cy={ind * pat.y+pat.height/2} r={pat.r} fill={pat.fillc} />
									      	</g>
						    		        )
						    		})}
						    </pattern>)
			    	}
			    	})
				}

			    {defaultNoRepeat.map(pat => {
			    	if (pat.id.includes('h')){ //all headers
				    	return (
						    <pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
						      <rect x="0" y={pat.offset} width={wMax} height={pat.barH} fill={pat.fill} stroke={pat.stroke} />
						      <text x="2" y={pat.barH+5} fontSize={pat.barH-2} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>{pat.id} header</text>
						    </pattern>
				    	)
			    	} else {

			    	}

			    })
				}
				{patternBoundingBox.map(pat => {
			    	if (pat.hasOwnProperty('icon')){ //movie or other
				    	return (
						    <pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat}  >
						      <rect x="0" y="0" width={pat.repeat} height={pat.repeat} fill={pat.fill} />
						      <line x1="0" y1="0" x2={pat.repeat} y2={pat.repeat} stroke={pat.stroke} fill="none" />
						      <line x2="0" y2="0" x1={pat.repeat} y1={pat.repeat} stroke={pat.stroke} fill="none" />
						      <img />
						    </pattern>
				    	)
			    	} else {

			    	}

			    })
				}



  			</defs>

    )

})

export default Patterns;

	//we should be able to dynamically update fonts, as added from google...
	//simply to appear with our dummy text

	// question of organization structure- the useSpaceOnUse and the generic series
//objectBoudnignBox


//update the icons while setting up this miscellaneous stuff

//ALL WHITE BACKGROUNDS TO CONTRAST WITH THE GRID BACKGROUND

/*
pixel grid background - darker series for the overall effect
paragraph
h1,h2,h3,h4,h5
ul (with il),
table (with verticals),
image video audio
button
forms: text, radio, file, options  (implied submit button)

options/text/file as single type

radio as lateral breaks, akin to tables, same structure as audio playlist-line - fixed horizon

image/video similar
*/
