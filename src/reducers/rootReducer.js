import { combineReducers } from 'redux';

import boxesReducer from './boxes';
import htmlReducer from './html';
import siblingReducer from './siblingReducer';
import pageReducer from './addPageReducer';

export default combineReducers({
  boxes: boxesReducer,
  html: htmlReducer,
  boxesCss: siblingReducer,
  pages: pageReducer,
});
