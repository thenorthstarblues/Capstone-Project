import CodeModal from './codemirror_modal';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Navigation=(({page})=>{

	//conditional rendering;
	const user = false;

	const templates = page !== 'templates';
	const directions = page !== 'directions';
	const editor = page !== 'editor';



	return (
	        <div className="row col-lg-12 flexWrap p20w bkgrey">
	        	<div className = "col-lg-6">
	    			<button className="btn btn-default" > Logo Here </button>
	    			{templates &&
						<button className="btn btn-default" > Templates </button>
	    			}
	    			<button className="btn btn-default" > Directions </button>
	    			{user &&
	    				<button className="btn btn-default" > User Page </button>
	    			}
	    			<button className="btn btn-default" > Login </button>
	    		</div>
	    		<div className = "col-lg-6 flexWrap spaceBetween">

						<CodeModal />
						<button className="btn btn-default" > Preview Hierarchy </button>
						<button className="btn btn-default" > Live Preview </button>
						<button className="btn btn-default" > Download Code</button>
						<button className="btn btn-default" > Save Layout</button>


				</div>
			</div>
	)
})

export default Navigation;
