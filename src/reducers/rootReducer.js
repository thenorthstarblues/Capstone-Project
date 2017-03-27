import { combineReducers } from 'redux-immutable';
import boxesReducer from './boxes';
import htmlReducer from './html';
import siblingReducer from './siblings';
import pageReducer from './addPageReducer';
import previewReducer from './preview';

export default combineReducers({
  boxes: boxesReducer,
  html: htmlReducer,
  boxesCss: siblingReducer,
  pages: pageReducer,
  preview: previewReducer,
});


