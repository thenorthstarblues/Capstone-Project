import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import Templates from './components/Templates';
import About from './components/About';
import User from './components/User';
import Preview from './components/Preview';

import store from './store';
import './style/css/bootstrap.min.css';
import './style/css/index.css';
// provide full routes later
import './style/css/App.css';
import './style/css/preview.css';
import './style/css/marginsVW.css';


render(
   <Provider store={store}>
     <Router>
       <div>
  <Route exact path="/" component={App} />
  <Route path="/templates" component={Templates} />
  <Route path="/about" component={About} /> {/* //about tabs should hold intro, directions, usecases */}
  <Route path="/profile/:user" component={User} />
  <Route path="/preview" component={Preview} /> {/* //about tabs should hold user's templates (created), user's templates (favorites), sidebar contact info/media preferences, other?

	       <Route path='/live' component={Live} /> //only holds the page preview w/ the top nav bar
	   		*/}
	     </div>
     </Router>
   </Provider>,
    document.getElementById('root'),
 );
