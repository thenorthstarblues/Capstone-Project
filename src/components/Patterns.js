import React, { Component } from 'react';
//---------------------------VISUAL AIDES-------------------------------

// key sizes converted for svg
var px20=14;
var em1=10.6;
var wMax=950; //max width

// to generate multi-line patterns
var repeats=[];
for (let i=0; i<600/14; i++){
	repeats.push(i);
}

//---------------------------CORE TYPES-------------------------------

//repeated patterns

// those with logic of bounding box
const patternBoundingBox=[
	{
		id:'img',
		fill: '#454545',
		stroke: "#ffffff",
		repeat: 1,
	},
	{
		id:'video',
		fill: '#454545',
		stroke: "#ffffff",
		repeat: 1,
		icon1: 144,
	},

];

// those with logic of default noMapping - i.e. set sizes
// headers - easy
// button - unique, but in others
// audio bar - unique
// radio buttons
// options, file, form lines - variants
const defaultNoRepeat=[
	{
		id: 'h1',
		h: true,
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
		h: true,
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
		h: true,
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
		h: true,
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
		h: true,
		fill: 'grey',
		tfill: 'white',
		stroke: 'none',
		repeat: 1,
		barH: 12,
		offset: 7,
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'button',
		button: true,
		fill: 'url(#Gradient1)',
		tfill: 'black',
		stroke: 'none',
		repeat: 1,
		barH: 18,
		offset: 7,
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'audio',
		audio: true,
		fill: 'lightgrey',
		tfill: 'black',
		stroke: 'none',
		repeat: 1,
		barH: 18,
		offset: 7,
		fontFam: 'Trenda',// to be reset by other options

	},
];

const forms=[
	{
		id: 'textForm',
		textForm: true,
		width: 100,
		fill: 'white',
		tfill: 'black',
		stroke: 'black',
		strokeW: 2,
		repeat: 1,
		barH: 18,
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'optionsForm',
		optionsForm: true,
		width: 100,
		fill: 'white',
		tfill: 'black',
		stroke: 'black',
		strokeW: 2,
		repeat: 1,
		barH: 18,
		fontFam: 'Trenda', // to be reset by other options
	},
	{
		id: 'fileForm',
		fileForm: true,
		width: 100,
		fill: 'white',
		tfill: 'black',
		stroke: 'black',
		strokeW: 2,
		repeat: 1,
		barH: 18,
		fontFam: 'Trenda', // to be reset by other options
	},
	{   id: 'radioForm',
		radioForm: true,
		width: 100,
		fill: 'white',
		tfill: 'black',
		stroke: 'none',
		strokeW: 0,
		repeat: 1,
		barH: 18,
		offset: 7,
		fontFam: 'Trenda', // to be reset by other options
	},
];

// those with logic of default noMapping and line repeats
// paragraphs, ul, tables,
const defaultRepeat=[ //new real effeciency gain
	{
		id:'paragraph',
		paragraph: true,
		repeat: em1,
		y: em1*1.33,
		height: em1*.7,
		fill: "#d0d0d0"
	},
	{
		id:'ului',
		ul: true,
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
		table: true,
		repeat: em1,
		y: em1*1.33,
		width: em1*6,
		offset: em1*1,
		height: em1*.7,
		fill: "#d0d0d0",
	},

];



const Patterns = (()=> {

    return (
            <defs>
            	<linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
				      <stop offset="5%" stopColor="white"/>
				      <stop offset="95%" stopColor="lightgrey"/>
				</linearGradient>

            	<pattern id="pixelGrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
			      <rect x="0" y="0" width="14" height="14" fill="none" stroke="#00bfff" />
			    </pattern>

			    {defaultRepeat.map(pat => {
				    	return (<pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
				    	        	<rect x="0" y="0" width={wMax} height={wMax} fill="white" />
						    	{repeats.map(ind=>{
						    		return (<g key={ind} >
						    				{pat.paragraph &&
						    		        <rect x="0" y={ind * pat.y} width={wMax} height={pat.height} fill={pat.fill} />
						    		    	}
						    		    	{pat.ul &&
						    		    			<g>
						    		    	        <rect x={pat.x} y={ind * pat.y} width={wMax} height={pat.height} fill={pat.fill} />
						    		        		<circle cx={pat.xc}  cy={ind * pat.y+pat.height/2} r={pat.r} fill={pat.fillc} />
						    		        		</g>
						    		    	}
						    		    	{pat.table &&
						    		    			<g>
						    		    	        <rect x="0" y={ind * pat.y} width={pat.width} height={pat.height} fill={pat.fill} />
						    		    	        <rect x={(pat.width+pat.offset)*1} y={ind * pat.y} width={pat.width} height={pat.height} fill={pat.fill} />
						    		    	        <rect x={(pat.width+pat.offset)*2} y={ind * pat.y} width={pat.width} height={pat.height} fill={pat.fill} />
						    		    	        <rect x={(pat.width+pat.offset)*3} y={ind * pat.y} width={pat.width} height={pat.height} fill={pat.fill} />
						    		    	        <rect x={(pat.width+pat.offset)*4} y={ind * pat.y} width={pat.width} height={pat.height} fill={pat.fill} />
						    		        		</g>
						    		    	}
									      	</g>
						    		        )
						    		})}
						    </pattern>)
			    	})
				}

			    {defaultNoRepeat.map(pat => {
			    	return (
						    <pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
						    	<rect x="0" y="0" width={wMax} height={wMax} fill="white" />
						      <rect x="0" y={pat.offset} width={wMax} height={pat.barH} fill={pat.fill} stroke={pat.stroke} />
						      {pat.h &&
						      	<text x="2" y={pat.barH+5} fontSize={pat.barH-2} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>{pat.id} header</text>
						      }
						      {pat.button &&
						      	<text x="10" y={pat.barH-3} fontSize={pat.barH/2} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>button</text>
						      }
						      {pat.audio &&
						      	<g>
						      	<text x="10" y={pat.barH+2} textAnchor="start" className="iconsH" fontSize={pat.barH-6} fill={pat.tfill} >&#xf04b;</text>
						      	<rect x="30" y={pat.barH/3+pat.offset} width="60" height={pat.barH/3} fill={pat.tfill} />
						      	</g>
						      }
						    </pattern>
				    	)

			    })
				}
				{forms.map(pat=>{
					return(
					       <pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} >
					       {pat.textForm &&
						      	<g>
						      	<rect x="0" y="0" ry="4" rx="4" width={pat.width} height={pat.barH} fill="white" stroke={pat.stroke} strokeWidth={pat.strokeW} />
						      	<text x="10" y={pat.barH*2/3} fontSize={pat.barH/1.5} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>enter text here</text>
						      	</g>
						      }
						      {pat.fileForm &&
						      	<g>
						      	<rect x="0" y="0" ry="4" rx="4" width={pat.width} height={pat.barH} fill="white" stroke={pat.stroke} strokeWidth={pat.strokeW} />
						      	<text x="25" y={pat.barH*2/3} fontSize={pat.barH/1.5} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>upload files</text>
						      	<text x="10" y={pat.barH*2/3} textAnchor="start" className="iconsH" fontSize={pat.barH/1.5} fill={pat.tfill} >&#xf0c7;</text>
						      	</g>
						      }
						      {pat.optionsForm &&
						      	<g>
						      	<rect x="0" y="0" ry="4" rx="4" width={pat.width} height={pat.barH} fill="white" stroke={pat.stroke} strokeWidth={pat.strokeW} />
						      	<text x="10" y={pat.barH*2/3} fontSize={pat.barH/1.5} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>select options</text>
						      	<text x="87" y={pat.barH*2/3} textAnchor="start" className="iconsH" fontSize={pat.barH/1.5} fill={pat.tfill} >&#xf0d7;</text>
						      	</g>
						      }
						      {pat.radioForm &&
						      	<g>
						      	<rect x="0" y="0" ry="4" rx="4" width={pat.width} height={pat.barH} fill="white" stroke={pat.stroke} strokeWidth={pat.strokeW} />
						      	<text x="25" y={pat.barH*2/3} fontSize={pat.barH/1.5} textAnchor="start" fill={pat.tfill} className={pat.fontFam}>radio option</text>
						      	<text x="10" y={pat.barH*2/3} textAnchor="start" className="iconsH" fontSize={pat.barH/1.5} fill={pat.tfill} >&#xf192;</text>
						      	</g>
						      }
					       </pattern>
					       )
				})}
				{patternBoundingBox.map(pat => {
				    	return (
						    <pattern key={pat.id} id={pat.id} x="0" y="0" width={pat.repeat} height={pat.repeat} patternContentUnits="objectBoundingBox" >
						      <rect x="0" y="0" width={pat.repeat} height={pat.repeat} fill={pat.fill} />
						      <line x1="0" y1="0" x2={pat.repeat} y2={pat.repeat} stroke={pat.stroke} strokeWidth=".01" fill="none" />
						      <line x1={pat.repeat} y1="0" x2="0" y2={pat.repeat} stroke={pat.stroke} strokeWidth=".01" fill="none" />
						      {pat.icon1 &&
						      	<g>
						      	<text x={pat.repeat*.5} y={pat.repeat*.6} textAnchor="middle" className="iconsH" fontSize=".35" fill="#ffffff" >&#xf04b;</text>
						      	<rect x="0" y=".95" width={pat.repeat} height=".05" fill="lightgrey"/>
						      	</g>
						      }
						    </pattern>
				    	)
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
