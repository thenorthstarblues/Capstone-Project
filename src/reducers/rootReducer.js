import {combineReducers} from 'redux';

import boxesReducer from './boxes';
import htmlReducer from './html';
import siblingReducer from './siblingReducer2.js';

export default combineReducers({
  boxes: boxesReducer,
  html: htmlReducer,
  sibling: siblingReducer,
});
