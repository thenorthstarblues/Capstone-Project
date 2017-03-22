import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import store from './store';

import './style/css/bootstrap.min.css';
import './style/css/index.css';

 render (
   <Provider store={store}>
     <Router>
       <Route path='/' component={App} />
     </Router>
  </Provider>,
    document.getElementById('root')
 );
