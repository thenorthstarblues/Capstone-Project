import { combineReducers } from 'redux-immutable';
import boxesReducer from './boxes';
import htmlReducer from './html';
import siblingReducer from './siblings';

export default combineReducers({
  boxes: boxesReducer,
  html: htmlReducer,
  boxesCss: siblingReducer,
});
