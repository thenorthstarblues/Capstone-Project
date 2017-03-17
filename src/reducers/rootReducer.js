import {combineReducers} from 'redux';
//import {routerReducer} from 'react-router-redux';

import boxesReducer, {htmlReducer} from './boxes';
//import {siblingReducer} from './siblingReducer.js';

export default combineReducers({
  boxes: boxesReducer,
  html: htmlReducer,
  //sibling: siblingReducer,
  //router: routerReducer,
});
