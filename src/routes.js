import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import store from './store';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';

const history = createBrowserHistory();

const routes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
       <Route exact path="/" component={App}/>
      </ConnectedRouter>

    </Provider>

  )
}

export default routes;
