
import React from 'react';
<<<<<<< HEAD
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './style/css/bootstrap.min.css';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';

const history = createBrowserHistory()

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
=======
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './App';
import './style/css/bootstrap.min.css';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory';


 const history = createBrowserHistory()


 render(
   <Provider store={store}>
     <Router routes={routes} history={history}>
       <Route path='/' component={App} />
     </Router>
  </Provider>,
    document.getElementById('root')
 );
>>>>>>> master
