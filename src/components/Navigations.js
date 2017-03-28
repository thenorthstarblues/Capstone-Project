
import {connect} from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import NotificationSystem from 'react-notification-system';
import {showPreview, hidePreview } from '../reducers/preview';
import {saveOrUpdate} from '../constants_actioncreators/groups';
import CodeModal from './codemirror_modal';
import { previewLive } from '../reducers/siblings';

const mapStateToProps = (state) => ({
  boxes: state.get('boxes').toJS(),
  currentId: state.get('pages').get('currentPage'),
  group: state.get('pages').get('group'),
  preview: state.get('preview').toJS().preview,
});

const mapDispatchToProps = (dispatch) => ({
	save(elements, id) {
    dispatch(saveOrUpdate(elements, id));
	},
  showPreview(boxes){
    dispatch(showPreview(boxes))
  },
  hidePreview(){
    dispatch(hidePreview())
  },
  previewLive(boxes){
    dispatch(previewLive(boxes))
  },
})

class Navigation extends Component{
	constructor(props){
		super(props);
		this.showHide=this.showHide.bind(this);
		this.getPreview=this.getPreview.bind(this);

	};

	 addNotification = (event) => {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Layout Saved',
      level: 'success'
    });
  }

	showHide = (e) => {
		e.preventDefault();
		let previewCur = this.props.preview;

		if (previewCur===true){
			console.log('true, need to set to false');
			this.props.hidePreview();
		} else {
			this.props.showPreview(this.props.boxes);
		}
	}

	getPreview = (e) =>{
		this.props.previewLive(this.props.boxes);
		console.log('check store for html-jsx and css', history, this.props);
		//<Redirect to="/preview" push={true} />;
		//history.pushState('/preview', []);
	}
	componentDidMount(){
		this._notificationSystem = this.refs.notificationSystem;
	}

	render(){
		//conditional rendering... will likely pull from routes
		const user = false;

		let page=this.props.page;

		const templates = page !== 'templates';
		const directions = page !== 'directions';
		const editor = page !== 'editor';
		const preview = page !== 'preview';


	return(
	        <div className="row col-lg-12 flexWrap p20w bkgrey">
					<NotificationSystem ref="notificationSystem" />
	        	<div className="col-lg-6">
	    			<Link to="/"><span className="TrendHMTitle"><img src="/AAlogo.svg" /> Agile-Armature </span></Link>
	    			{templates &&
						<Link to="/templates"><span className="menuL" > Templates <span className="glyphicon glyphicon-minus"></span></span></Link>
	    			}
	    			{directions &&
	    			<Link to="/directions"><span className="menuL" > Directions <span className="glyphicon glyphicon-minus"></span></span></Link>
	    			}
	    			{user &&
	    				<Link to="/profile"><span className="menuL" > User Page </span></Link>
	    			}
	    			<span className="menuL" > Login </span>
	    		</div>
	    		<div className="col-lg-5 col-lg-offset-1 flexWrap spaceBetween">
						<CodeModal />
							<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm TrendHandMade closer" type="button"><span className="TrendHandMade closer">  Download Code   </span></button>
							<span className="glyphicon glyphicon-minus"></span>
						<button className="btn btn-default btn-sm" type="button" onClick={(e)=> { this.addNotification(e);
							this.props.save(this.props.boxes, this.props.currentId)}}><span className="TrendHandMade closer"> Save Layout </span></button>


				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
