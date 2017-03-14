import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import App from './App';


const routes = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
      </Router>

    </Provider>

  )
}

export default routes;
