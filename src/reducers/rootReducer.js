import {combineReducers} from 'redux';
//import {routerReducer} from 'react-router-redux';

import boxesReducer from './boxes';
import htmlReducer from './html';
//import {siblingReducer} from './siblingReducer.js';

export default combineReducers({
  boxes: boxesReducer,
  html: htmlReducer,
  //sibling: siblingReducer,
  //router: routerReducer,
});
