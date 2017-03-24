import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import App from './App';
// import About from './components/About';
// import Templates from './components/Templates';

import store from './store';

import './style/css/bootstrap.min.css';
import './style/css/index.css';

 render (
   <Provider store={store}>
     <Router>
       <Route path='/' component={App} >
       		{/*<Route path='/welcome' component={About} />
       		<Route path='/templates' component={Templates} />*/}
       </Route>
     </Router>
  </Provider>,
    document.getElementById('root')
 );
