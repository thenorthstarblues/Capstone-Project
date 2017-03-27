import CodeModal from './codemirror_modal';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'; 

import {saveOrUpdate} from '../constants_actioncreators/groups'


const Navigation=(({page})=>{

	//conditional rendering;
	const user = false;

	const templates = page !== 'templates';
	const directions = page !== 'directions';
	const editor = page !== 'editor';



	return (
	        <div className="row col-lg-12 flexWrap p20w bkgrey">
	        	<div className = "col-lg-6">
	    			<span className="TrendHMTitle" ><img src="/AAlogo.svg" /> Agile-Armature </span>
	    			{templates &&
						<span className="menuL" > Templates <span className="glyphicon glyphicon-minus"></span></span>

	    			}
	    			<span className="menuL" > Directions <span className="glyphicon glyphicon-minus"></span></span>
	    			{user &&
	    				<span className="menuL" > User Page </span>
	    			}
	    			<span className="menuL" > Login </span>
	    		</div>
	    		<div className = "col-lg-6 flexWrap spaceBetween">

						{/*<CodeModal />*/}
						<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button"> Preview Hierarchy   </button>
						<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button"> Live Preview   </button>
						<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button"> Download Code   </button>
						<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button" onClick={()=> {saveOrUpdate()}}> Save Layout   </button>


				</div>
			</div>
	)
})

export default Navigation;
