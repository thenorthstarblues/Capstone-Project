import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
