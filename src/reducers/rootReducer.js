import {combineReducers} from 'redux';
//import {routerReducer} from 'react-router-redux';

import boxesReducer from './boxes';
//import {siblingReducer} from './siblingReducer.js';

export default combineReducers({
  boxes: boxesReducer,
  //sibling: siblingReducer,
  //router: routerReducer,
});
