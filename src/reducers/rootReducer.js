import {combineReducers} from 'redux';
<<<<<<< HEAD
import boxesReducer from './boxes';

export default combineReducers({
  boxes: boxesReducer,
})
=======
import {routerReducer} from 'react-router-redux';
import {siblingReducer} from './siblingReducer.js';
//for when/if we add more combineReducers do it here

const initialState = { // probably rework. . .
  main: {}
};
//dont forget to set state types!


const reducer = (state= initialState, action) => {

  const newState = Object.assign({}, state);

  switch(action.type){
    case 'test':
     newState.main = action.payload;
       break;

    default:
      return state;
  }

  return newState;
}




 const rootReducer = combineReducers({
  main: reducer,
  router: routerReducer,

});


export default rootReducer;
>>>>>>> master
