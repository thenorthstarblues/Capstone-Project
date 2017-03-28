import {connect} from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

const NavBack = (({page})=> {

		const user = false;


		const templates = page !== 'templates';
		const directions = page !== 'directions';
		const editor = page !== 'editor';
		const preview = page !== 'preview';

	return(
	        <div className="row col-lg-12 flexWrap p20w bkgrey">
	        	<div className="col-lg-6">
	    			<Link to="/"><span className="TrendHMTitle"><img src="/AAlogo.svg" /> Agile-Armature </span></Link>

					<Link to="/"><span className="menuL" ><span className="glyphicon glyphicon-minus"></span> Return to Editing  <span className="glyphicon glyphicon-minus"></span></span></Link>
	    		</div>
			</div>
		)

})

export default NavBack;
