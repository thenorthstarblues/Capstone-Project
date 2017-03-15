 import React from 'react';
 import { render } from 'react-dom';
 import { Router, Route } from 'react-router';
 import { Provider } from 'react-redux';
 import store from './store';
  import routes from './routes';
  import './index.css';
 import createBrowserHistory from 'history/createBrowserHistory';
 import App from './App';

 const history = createBrowserHistory()


 render(
   <Provider store={store}>
     <Router routes={routes} history={history}>
       <Route path='/' component={App} />
     </Router>
  </Provider>,
    document.getElementById('root')
 );
