import CodeModal from './codemirror_modal';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Navigation=(()=>{
	return (
	        <div className="row col-lg-12 flexWrap p20w bkgrey">
	        	<div className = "col-lg-5">
	    			<button className="btn btn-default" > Logo Here </button>
	    		</div>
	    		<div className = "col-lg-7 flexWrap spaceBetween">
					<CodeModal />
					<button className="btn btn-default" > Live Preview </button>
					<button className="btn btn-default" > Save/Share </button>
					<button className="btn btn-default" > Starting Templates </button>
					<button className="btn btn-default" > Current Group/Designs </button>
				</div>
			</div>
	)
})

export default Navigation;
