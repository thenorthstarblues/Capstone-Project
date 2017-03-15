import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
//for when/if we add more combineReducers do it here

const initialState = {
  main: {}
};
//dont forget to set state types!


const testFunc = (payload) => {
  type: 'test',
  payload
}
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

export const dispatchTest = (payload) => {
  return dispatch => {dispatch(testFunc(payload))};
};


 const rootReducer = combineReducers({
  main: reducer,
  router: routerReducer
});


export default rootReducer;
