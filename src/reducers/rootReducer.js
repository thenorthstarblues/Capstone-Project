import {combineReducers} from 'redux';
import boxesReducer from './boxes';

export default combineReducers({
  boxes: boxesReducer,
})
